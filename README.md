# Aplicación Full Stack - Spring Boot & Next.js

 **Descripción:**  
Este proyecto es una aplicación Full Stack que permite **gestionar un CRUD de productos**, utilizando **Spring Boot** para el backend y **Next.js** para el frontend.  
El despliegue se realiza con **Docker, Kubernetes y Jenkins (CI/CD)**.  

---

##  Tecnologías Utilizadas
🔹 **Backend (Spring Boot)**
- Java 17 + Spring Boot  
- Spring Data JPA (Hibernate)  
- Base de datos H2 (Para pruebas)   
- Maven  

🔹 **Frontend (Next.js)**
- React + Next.js  
- React Query para consumo de API  
- TailwindCSS para estilos  
- Axios para peticiones HTTP  

🔹 **DevOps**
- Docker (Imágenes de backend y frontend)  
- Kubernetes (Despliegue en clúster)  
- Jenkins (CI/CD)  
- Minikube (Para pruebas locales de Kubernetes)  

---

##  Funcionalidades
 **Backend (Spring Boot)**  
- API RESTful para gestionar productos (`/api/productos`).  
- CRUD completo (Crear, Leer, Actualizar, Eliminar).  
- Base de datos H2 en memoria unicamente para pruebas  

**Frontend (Next.js + React Query)**  
- Interfaz para administrar productos.  
- Formulario para crear y actualizar productos.  
- Listado de productos en tiempo real.  

**CI/CD y Despliegue**  
- Construcción y despliegue automático con Jenkins.  
- Contenedores Docker para backend y frontend.  
- Kubernetes para orquestación y escalabilidad.  

---

## Instalación y Ejecución en Local
### Clonar el repositorio
```sh
git clone https://github.com/san7imo/mi-proyecto.git
cd mi-proyecto
```

### Ejecutar Backend
```sh
cd backend
mvn clean spring-boot:run
```
 **Acceder a la API:** `http://localhost:8080/api/productos`

### Ejecutar Frontend
```sh
cd frontend
npm install
npm run dev
```
 **Abrir en el navegador:** `http://localhost:3000`

---

## Ejecución con Docker
### Construir las imágenes
```sh
docker build -t san7imo/products-backend:latest backend/
docker build -t san7imo/products-frontend:latest frontend/
```

### Ejecutar los contenedores
```sh
docker run -p 8080:8080 san7imo/products-backend
docker run -p 3000:3000 san7imo/products-frontend
```
 **Verificar en:**  
- API: `http://localhost:8080/api/productos`  
- Web: `http://localhost:3000`

---

#  CI/CD con Jenkins
##  Configuración de CI/CD
Este proyecto utiliza Jenkins para automatizar la construcción y despliegue.  

### Configurar Jenkins
1. Instalar **Jenkins** y los plugins necesarios:  
   - **Pipeline**  
   - **Git**  
   - **Docker Pipeline**  
2. Crear un nuevo **Pipeline** en Jenkins.  
3. Configurar "Pipeline script from SCM" y apuntar al repositorio GitHub.  

### Jenkinsfile (Pipeline de CI/CD)
Este pipeline:  
Clona el repositorio.  
Construye backend y frontend.  
Crea imágenes Docker.  
Sube imágenes a Docker Hub.  
Despliega en Kubernetes.  

**Jenkinsfile:**
```groovy
pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'san7imo'
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

        stage('Publicar en Docker Hub') {
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
                    sh 'kubectl apply -f k8s/'
                }
            }
        }
    }

    post {
        success {
            echo '¡Despliegue exitoso en Kubernetes!'
        }
        failure {
            echo 'Error en la ejecución'
        }
    }
}
```

---

# Despliegue en Kubernetes
## Configuración de Kubernetes
Para desplegar en **Kubernetes**, se utilizan archivos YAML en la carpeta **`k8s/`**.

### Aplicar los archivos de Kubernetes
```sh
kubectl apply -f k8s/
```

### Verificar el estado
```sh
kubectl get pods
kubectl get services
```

### Acceder a la aplicación
Si no tienes dominio, usa `localhost` en el archivo `ingress.yaml`:  
```yaml
rules:
  - host: localhost
```
Luego accede en:  
- **Backend:** `http://localhost/api/productos`  
- **Frontend:** `http://localhost/`  

---

# Estructura del Proyecto
```
/products
├── products(backend)/                          # Código del backend (Spring Boot)
│   │── src/
│   ├── main/
│   │   ├──java/com/innerconsulting/products/
│   │   │   ├── application/                    # Capa de aplicación (Servicios, DTOs, Mappers)
│   │   │   │   ├── dto/                        # Objetos de transferencia de datos (Request/Response)
│   │   │   │   ├── mapper/                     # Convertidores Entity <-> DTO
│   │   │   │   ├── service/                    # Servicios de negocio
│   │   │   │   ├── exceptions                  # Excepciones personalizadas
│   │   │   ├── config/                         # Configuraciones generales 
│   │   │   ├── domain/                         # Capa de dominio (Entidades y Repositorios)
│   │   │   │   ├── entities/                   # Entidades JPA
│   │   │   │   ├── repositories/               # Repositorios Spring Data JPA
│   │   │   ├── infrastructure/                 # Configuración, seguridad y excepciones
│   │   │   │   ├── config/                     # Configuración general (CORS, Security, etc.)
│   │   │   │   ├── handler/                    # Manejador de excepciones globales
│   │   │   │   ├── controllers/                # Controladores REST
│   │   │   ├── ProductsApplication.java        # Clase principal de Spring Boot
│   │   ├── resources/
│   │   │   ├── application.properties          # Configuración de Spring Boot
│   ├── test/                                   # Pruebas unitarias y de integración
│── target/                                     # Archivos compilados (se genera después del build)
│── Dockerfile                                  # Archivo Docker para el backend
│── pom.xml                                     # Configuración de Maven
│
├── frontend/                                   # Código del frontend (Next.js)
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── types/
│   ├── package.json
│   ├── Dockerfile
│
├── k8s/                                         # Archivos Kubernetes
│   ├── deployment-backend.yaml
│   ├── service-backend.yaml
│   ├── deployment-frontend.yaml
│   ├── service-frontend.yaml
│   ├── ingress.yaml
│
├── Jenkinsfile                                  # Configuración CI/CD
├── README.md                                    # Documentación
```

---

## Conclusión
 Este proyecto integra **Spring Boot, Next.js, Docker, Kubernetes y Jenkins** en un flujo completo de CI/CD.  
 **Puedes ejecutarlo localmente, en Docker o desplegarlo en Kubernetes.**  

 **¿Dudas?** Contáctame en [GitHub](https://github.com/san7imo).  
