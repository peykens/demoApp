pipeline {
  def app
	def gitCommit = "latest"
	def packageVersion
	def name = "intMyAPp"
	def namespace = "lab5a"
	def project = "eesi"
	def dockerRegistry = "registry.lgi.io/libertyglobal"
  
  agent any
  stages {
    stage('Git code') {
      steps {
        git(url: 'git@github.com:peykens/demoApp.git', branch: 'master')
      }
    }
    stage('Building image') {
      steps{
        script {
          app = docker.build "${name}:${gitCommit}"
        }
      }
    }
    stage('Build image') {
      steps {
        sh 'docker build -f Dockerfile -t myapp:latest .'
      }
    }
    stage('Build test wrapper') {
      steps {
        sh 'docker build -f Dockerfile.test -t mytest:latest .'
      }
    }
    stage('Run npm tests') {
      steps {
        sh 'docker run -t --rm --name mytest mytest:latest'
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