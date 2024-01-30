LICENSES_FILE=tools/licenses.txt
WHITELIST_PACKAGES_FILE=tools/whitelist-packages.txt

function print_warning {
    if [ ${#WARNING_DEPENDENCIES[@]} -gt 0 ]; then
        echo "[!] WARNING: Some packages are not safe:"
        for DEPENDENCIES in "${WARNING_DEPENDENCIES[@]}"; do
            echo "$DEPENDENCIES"
        done
    fi
}

WHITELIST_PACKAGES_ARRAY=()

APPROVED_LICENSES_ARRAY=()
while read line || [ -n "$line" ]; do
    APPROVED_LICENSES_ARRAY+=("^$line$")
done <$LICENSES_FILE

WHITELIST_PACKAGES_ARRAY=()
WARNING_WHITELIST_PACKAGES_ARRAY=()

while read line || [ -n "$line" ]; do
    if [[ "$line" =~ ^\! ]]; then
        WARNING_WHITELIST_PACKAGES_ARRAY+=("^${line:1}$")
        continue
    fi
    WHITELIST_PACKAGES_ARRAY+=("^$line$")
done <$WHITELIST_PACKAGES_FILE

APPROVED_LICENSES_REGEX=$(
    IFS="|"
    echo "${APPROVED_LICENSES_ARRAY[*]}"
)

WHITELIST_PACKAGES_REGEX=$(
    IFS="|"
    echo "${WHITELIST_PACKAGES_ARRAY[*]}"
)

WARNING_WHITELIST_PACKAGES_REGEX=$(
    IFS="|"
    echo "${WARNING_WHITELIST_PACKAGES_ARRAY[*]}"
)

REJECTED_DEPENDENCIES=()
WARNING_DEPENDENCIES=()

LICENSES=$(license_finder report | tail -n +2)

IFS=$'\n' read -rd '' -a DEPENDENCIES <<<"$LICENSES"

for DEPENDENCY in "${DEPENDENCIES[@]}"; do

    DEPENDENCY_NAME=$(echo "$DEPENDENCY" | cut -d ',' -f 1 | xargs)
    DEPENDENCY_VERSION=$(echo "$DEPENDENCY" | cut -d ',' -f 2 | xargs)
    DEPENDENCY_LICENSES=$(echo "$DEPENDENCY" | cut -d ',' -f 3- | tr -d '"' | xargs)

    if [[ "$DEPENDENCY_NAME" =~ $WHITELIST_PACKAGES_REGEX ]]; then
        continue
    fi

    if [[ "$DEPENDENCY_NAME" =~ $WARNING_WHITELIST_PACKAGES_REGEX ]]; then
        WARNING_DEPENDENCIES+=("$DEPENDENCY")
        continue
    fi

    IFS=$',' read -rd '' -a SPLITTED_DEPENDENCY_LICENSES <<<"$DEPENDENCY_LICENSES"

    HAVE_REJECTED_DEPENDENCY=0
    LICENSES_WITH_STATUS=()

    for DEPENDENCY_LICENSE in "${SPLITTED_DEPENDENCY_LICENSES[@]}"; do
        DEPENDENCY_LICENSE=$(echo "$DEPENDENCY_LICENSE" | xargs)
        if [[ ! "$DEPENDENCY_LICENSE" =~ $APPROVED_LICENSES_REGEX ]]; then
            HAVE_REJECTED_DEPENDENCY=1
            LICENSES_WITH_STATUS+=("[!] $DEPENDENCY_LICENSE")
        fi
    done

    if [ $HAVE_REJECTED_DEPENDENCY -eq 1 ]; then
        JOINED_NEW_DEPENDENCY_LICENSE=$(
            IFS=", "
            echo "${LICENSES_WITH_STATUS[*]}"
        )
        REJECTED_DEPENDENCIES+=("$DEPENDENCY_NAME, $DEPENDENCY_VERSION, $JOINED_NEW_DEPENDENCY_LICENSE")
    fi
done

if [ ${#REJECTED_DEPENDENCIES[@]} -gt 0 ]; then
    echo "[!] ERROR: Some packages are not approved:"
    for DEPENDENCY in "${REJECTED_DEPENDENCIES[@]}"; do
        echo "$DEPENDENCY"
    done
    print_warning
    exit 1
else
    echo "[+] All packages are approved"
    print_warning
    exit 0
fi
