def envFileDeploy
def environmentName

def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger',
]

def secretFolder = '~/configs/cardano-explorer-fe'
pipeline {
	agent any

    stages {
        stage('Build') {
            steps {
        	    script {
                    if (env.BRANCH_NAME == 'test') {
                        envFileDeploy = secretFolder + '/test-fe.env'
                        environmentName = 'test'
                    }
                    if (env.BRANCH_NAME == 'uat') {
                        envFileDeploy = secretFolder + '/uat-fe.env'
                        environmentName = 'uat'
                    }
                    if (env.BRANCH_NAME == 'main') {
                        envFileDeploy = secretFolder + '/prod-fe.env'
                        environmentName = 'prod'
                    }
                }
                sh "cp ${envFileDeploy} .env"
				sh "docker build -t cardano-explorer-fe ."
            }
        }
        stage('Deliver') {
            steps {
                sh "docker compose --env-file ${envFileDeploy} -p ${env.BRANCH_NAME}  up -d --build"
				sh "docker images -f 'dangling=true' -q --no-trunc | xargs --no-run-if-empty docker rmi"
            }
        }
    }
    post {
        always {
            script {
                Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            }
            slackSend channel: "#build-group-test",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* ${env.JOB_NAME} build ${env.BUILD_NUMBER} by commit author: ${Author_ID} \n More information at: ${env.BUILD_URL}"
        }
    }
}
