module.exports = function (grunt) {
    const sass = require('sass'); // Importa o módulo sass

    grunt.initConfig({
        // Configuração da tarefa de compilação do Sass usando grunt-sass
        sass: {
            options: {
                implementation: sass, // Define a implementação como Dart Sass
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/style.min.css': 'src/scss/style.scss' // Caminho correto do arquivo Sass
                }
            }
        },
        // Configuração da tarefa de minificação do CSS
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['style.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        // Configuração da tarefa de minificação do JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/js/script.min.js': 'src/js/script.js', // Minificar script.js
                }
            }
        },
        // Configuração da tarefa de minificação do HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true, // Remove comentários
                    collapseWhitespace: true // Remove espaços em branco
                },
                files: [{
                    expand: true,
                    cwd: 'src', // Diretório de origem
                    src: ['*.html'], // Arquivos HTML a serem minificados
                    dest: 'dist', // Diretório de destino
                    ext: '.min.html' // Extensão dos arquivos minificados
                }]
            }
        },
        // Configuração da tarefa de cópia do index.html para a pasta dist
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['index.html'], // Ajuste conforme o nome do seu HTML
                    dest: 'dist/',
                    rename: function (dest, src) {
                        return dest + src; // Mantém o mesmo nome
                    }
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'src/Fontes', // Diretório de origem das fontes
                    src: ['**/*.{ttf,woff,woff2,eot,svg}'], // Extensões de fontes
                    dest: 'dist/Fontes' // Diretório de destino das fontes
                }]
            }
        },
        // Configuração da tarefa de otimização de imagens
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/', // Diretório de origem
                    src: ['**/*.{png,jpg,jpeg,gif,svg}'], // Tipos de arquivos de imagem a serem otimizados
                    dest: 'dist/img/' // Diretório de destino
                }]
            }
        },
        // Observação de mudanças nos arquivos Sass, JavaScript, HTML e Fontes
        watch: {
            styles: {
                files: ['src/scss/*.scss'], // Observa mudanças nos arquivos SCSS
                tasks: ['sass', 'cssmin'] // Compila e minifica o CSS ao detectar mudanças
            },
            scripts: {
                files: ['src/js/*.js'], // Observa mudanças nos arquivos JS
                tasks: ['uglify'] // Minifica os arquivos JS ao detectar mudanças
            },
            html: {
                files: ['src/*.html'], // Observa mudanças nos arquivos HTML
                tasks: ['htmlmin', 'copy:html'] // Minifica os arquivos HTML e copia o index.html ao detectar mudanças
            },
            images: {
                files: ['src/img/**/*.{png,jpg,jpeg,gif,svg}'], // Observa mudanças nas imagens
                tasks: ['imagemin'] // Otimiza imagens ao detectar mudanças
            },
            fonts: {
                files: ['src/Fontes/**/*.{ttf,woff,woff2,eot,svg}'], // Observa mudanças nas fontes
                tasks: ['copy:fonts'] // Copia as fontes ao detectar mudanças
            },
        }
    });

    // Carrega os módulos Grunt necessários
    grunt.loadNpmTasks('grunt-sass'); // Carregar o módulo grunt-sass
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // Carregar o módulo htmlmin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin'); // Carregar o módulo imagemin
    grunt.loadNpmTasks('grunt-contrib-copy'); // Carregar o módulo de cópia

    // Registra as tarefas padrão
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'htmlmin', 'imagemin', 'copy:fonts', 'copy:html']);
};

