def envFileDeploy

def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger',
]

pipeline {
	agent any

    stages {
        stage('Build') {
			agent { docker 'node:16' }
            steps {
				sh "yarn install"
            }
        }
        stage('Deliver') {
            steps {
				script {
                    if (env.BRANCH_NAME == 'dev') {
                        envFileDeploy = '/tmp/dev-fe.env'
                    }
                    if (env.BRANCH_NAME == 'test') {
                        envFileDeploy = '/tmp/test-fe.env'
                    }
                }
                sh "docker-compose --env-file ${envFileDeploy} up -d --build"
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
