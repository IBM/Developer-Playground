pipeline {
    agent any

    parameters {
        // choice(name: 'ENV', choices: ['sandbox-ocp', 'sandbox-iks', 'dev-iks', 'dev-iks-latest', 'stage-iks', 'production-iks'], description: 'Deployment environment')
        string defaultValue: 'HEAD', description: 'Repository Commit', name: 'COMMIT', trim: true
    }

    stages {
        stage('Setup env') {
            environment {
				DOCKER_CREDS = credentials('dockerhub')
                ICR_CREDS = credentials('jenkins-ibm-cloud-cr-api-key')
			}
            steps {
                sh label: 'Checkout commit', script: 'git checkout $COMMIT'
                sh label: 'Docker Login', script: 'echo $DOCKER_CREDS_PSW | docker --config ./ login -u=$DOCKER_CREDS_USR --password-stdin docker.io'
                sh label: 'ICR Login', script: 'echo $ICR_CREDS_PSW | docker --config ./ login -u=$ICR_CREDS_USR --password-stdin us.icr.io'
                // checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'playground-resources']], userRemoteConfigs: [[credentialsId: 'apihub_githubtoken', url: 'https://github.ibm.com/ibm-api-marketplace/playground-resources']]])

                script {
                    env.IMAGE_TAG = sh(label: 'Set IMAGE_TAG', returnStdout: true, script: "git rev-parse $COMMIT").trim()
                    // env.ARGOCD_APP = sh(label: 'Set ARGOCD_APP', returnStdout: true, script: "yq e \".argocd_app\" playground-resources/${params.ENV}/values.yaml").trim()
                    // env.NAMESPACE = sh(label: 'Set NAMESPACE', returnStdout: true, script: "yq e \".namespace\" playground-resources/${params.ENV}/values.yaml").trim()
                    env.IMAGE_EXISTS = sh(label: 'Check if image is already pushed', returnStatus: true, script: "docker --config ./ manifest inspect us.icr.io/apihub-cr/podman-heregc:${env.IMAGE_TAG}")
                }
            }
        }

        stage('Build') {
            when {
                environment name: 'IMAGE_EXISTS', value: '1'
            }
            steps {
                sh label: 'Build', script: "docker --config ./ build -t 'us.icr.io/apihub-cr/podman-heregc:${env.IMAGE_TAG}' ."
                sh label: 'Push Image', script: "docker --config ./ push us.icr.io/apihub-cr/podman-heregc:${env.IMAGE_TAG}"
            }
        }

        // stage('Update resource') {
        //     environment {
        //         GIT_CREDS = credentials('github-token')
        //     }
        //     steps {
        //         sh label: 'Commit new image', script: """cd playground-resources
        //             git checkout main
        //             git reset --hard origin/main
        //             yq e -i '(.images.[] | select(.name == "us.icr.io/apihub-cr/podman-heregc").newTag) |= "${env.IMAGE_TAG}"' ${params.ENV}/resources/kustomization.yaml
        //             git add ${params.ENV}/resources/kustomization.yaml
        //             git diff-index --quiet HEAD || git commit -m 'Set ${params.ENV} home deployment image'
        //             git push https://$GIT_CREDS_USR:$GIT_CREDS_PSW@github.ibm.com/ibm-api-marketplace/playground-resources"""
        //     }
        // }

        // stage('Sync resource') {
		// 	when {
		// 		triggeredBy cause: "UserIdCause"
		// 	}

		// 	environment {
        //         GIT_OPS_TOKEN = credentials('gitops-token')
        //     }

		// 	steps {
		// 		sh label: 'Sync resources', script: "argocd app sync ${env.ARGOCD_APP} --resource apps:Deployment:${env.NAMESPACE}/playground-home --grpc-web --auth-token $GIT_OPS_TOKEN --server openshift-gitops-server-openshift-gitops.integro-sandbox-cluster-dec238a6ba0c64ed92191aa193d448c3-0000.us-south.containers.appdomain.cloud"
		// 	}
		// }
    }

    post { 
        always {
            cleanWs()
        }
    }
}
