pipeline {
    agent any
    
    environment {
        DOCKERHUB_USER = 'san7imo'
        DOCKERHUB_PASS = 'Oliver0227.'
        BACKEND_IMAGE = 'san7imo/products-backend'
        FRONTEND_IMAGE = 'san7imo/products-frontend'
    }

    stages {
        stage('Clonar Código') {
            steps {
                git branch: 'main', url: 'https://github.com/san7ilo/products-fullstack.git'
            }
        }

        stage('Construir Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Construir Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install && npm run build'
                }
            }
        }

        stage('Construir Imágenes Docker') {
            steps {
                script {
                    sh "docker build -t $BACKEND_IMAGE backend/"
                    sh "docker build -t $FRONTEND_IMAGE frontend/"
                }
            }
        }

        stage('Publicar Imágenes en DockerHub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin"
                    sh "docker push $BACKEND_IMAGE"
                    sh "docker push $FRONTEND_IMAGE"
                }
            }
        }

        stage('Desplegar en Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment-backend.yaml'
                    sh 'kubectl apply -f k8s/service-backend.yaml'
                    sh 'kubectl apply -f k8s/deployment-frontend.yaml'
                    sh 'kubectl apply -f k8s/service-frontend.yaml'
                    sh 'kubectl apply -f k8s/ingress.yaml'
                }
            }
        }
    }

    post {
        success {
            echo '🚀 ¡Despliegue exitoso en Kubernetes!'
        }
        failure {
            echo '❌ Fallo en la construcción o despliegue'
        }
    }
}
