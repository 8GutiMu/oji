'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const fun = require('./functions.js');

// Main menu
function showMenu() {
	return inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: `${chalk.green.bold('Welcome to OJI!')} Choose option:`,
			choices: [
				{
					name: 'Create new emoji',
					value: 'create'
				},
				{
					name: 'Copy saved emoji',
					value: 'get'
				},
				{
					name: 'Show example emoji list',
					value: 'example'
				},
				new inquirer.Separator(),
				{
					name: `${chalk.red('Exit')}`,
					value: 'exit'
				}
			]
		}
	]).then(a => {
		return fun[a.option]();
	}).then(() => {
		return inquirer.prompt([{
			type: 'confirm',
			name: 'exit',
			message: 'Exit utility?',
			default: true
		}]);
	}).then(a => {
		if (a.exit) {
			return fun.exit();
		}
		showMenu();
	});
}

// Handle the error
module.exports = showMenu()
  .catch(err => {
	console.log(chalk.red('Something bad happened (︶︹︺)'));
	console.log(err);
	process.exit(1);
});
