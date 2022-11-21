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
				sh "yarn add global sonarqube-scanner"
            }
        }
        stage('Sonarube Analysis') {
			agent { docker 'node:16' }
            steps {
				echo 'Sonar scanning...'
				sh "yarn run sonar-scanner -Dsonar.projectKey=cardano-explorer-fe -Dsonar.analysisCache.enabled=false -Dsonar.host.url=http://172.16.1.230:9111 -Dsonar.login=sqp_87a09cd54f541fb5f4b519541f20c5b167db814c -Dsonar.sources=. "
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
                    if (env.BRANCH_NAME == 'prod') {
                        envFileDeploy = '/tmp/prod-fe.env'
                    }
                }
                sh "docker-compose --env-file ${envFileDeploy} up -d --build"
				sh "docker images -f 'dangling=true' -q --no-trunc | xargs docker rmi"
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
