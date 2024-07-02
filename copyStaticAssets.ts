import * as shell from "shelljs";

shell.cp("-R", "src/views/", "dist/src/views/");
shell.cp("-R", "doc/", "dist/src/doc/");
shell.cp("-R", "src/public", "dist/src/public/");
shell.cp("-R", "src/assets", "dist/src/assets/");
shell.cp("-R", "src/cron", "dist/");
// shell.cp("-R", "src/public/fonts", "dist/public/");
// shell.cp("-R", "src/public/images", "dist/public/");
// shell.cp("-R", "src/public/css", "dist/public/");
