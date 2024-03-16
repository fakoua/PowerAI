module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-exec");
  grunt.initConfig({
    exec: {
      node_lint: {
        cwd: "node",
        command: "eslint --ext .ts ./",
      },
      node_publish: {
        cwd: "node",
        command: "tsc && npm publish --access=public",
      },
      dotnet_build: {
        cwd: "dotnet",
        command: "dotnet build",
      },
      dotnet_publish: {
        cwd: "dotnet",
        command: "dotnet publish -c Release -o ./publish",
      },
      deno_fmt: {
        cwd: "deno",
        command: "deno fmt",
      },
      deno_lint: {
        cwd: "deno",
        command: "deno lint",
      },
      deno_publish: {
        cwd: "deno",
        command: "deno publish",
      },
    },
  });

  grunt.registerTask("node", ["exec:node_lint", "exec:node_publish"]);
  grunt.registerTask("dotnet", ["exec:dotnet_build", "exec:dotnet_publish"]);
  grunt.registerTask("deno", ["exec:deno_fmt", "exec:deno_lint", "exec:deno_publish"]);
};
