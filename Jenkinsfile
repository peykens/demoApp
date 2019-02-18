pipeline {
  agent any
  stages {
    stage('Git code') {
      steps {
        git(url: 'git@github.com:peykens/demoApp.git', branch: 'master')
      }
    }
    stage('Building image') {
      steps {
        script {
          docker.build("myapp:latest","-f Dockerfile")
        }

      }
    }
    stage('Building test image wrapper') {
      steps {
        script {
          docker.build("mytest:latest","-f Dockerfile.test")
        }

      }
    }
    stage('Run npm tests') {
      steps {
        script {
          docker.image("mytest:latest").withRun('-t --rm  --name mytest')
        }

      }
    }
    stage('Deploy') {
      steps {
        sh 'docker stop myapp'
        sh 'docker rm myapp'
        sh 'docker run -d -p 3000:3000 --name myapp myapp:latest'
      }
    }
  }
}