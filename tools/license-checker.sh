LICENSES_FILE=tools/licenses.txt
APPROVED_LICENSES_ARRAY=()
while read line || [ -n "$line" ]; do
    APPROVED_LICENSES_ARRAY+=("^$line$")
done <$LICENSES_FILE

APPROVED_LICENSES_REGEX=$(
    IFS="|"
    echo "${APPROVED_LICENSES_ARRAY[*]}"
)
REJECTED_DEPENDENCIES=()

LICENSES=$(license_finder report | tail -n +2)

IFS=$'\n' read -rd '' -a DEPENDENCIES <<<"$LICENSES"

for DEPENDENCY in "${DEPENDENCIES[@]}"; do
    DEPENDENCY_NAME=$(echo "$DEPENDENCY" | cut -d ',' -f 1 | xargs)
    DEPENDENCY_VERSION=$(echo "$DEPENDENCY" | cut -d ',' -f 2 | xargs)
    DEPENDENCY_LICENSES=$(echo "$DEPENDENCY" | cut -d ',' -f 3- | tr -d '"' | xargs)

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
    echo "[!] INVALID DEPENCENCIES:"
    for DEPENDENCY in "${REJECTED_DEPENDENCIES[@]}"; do
        echo "$DEPENDENCY"
    done
    exit 1
fi

echo "[+] All licenses are approved"
exit 0
