import { execSync } from 'node:child_process';
import { tryit } from 'radash';
import { defineEventHandler, getQuery } from '#imports';

const CMD_DISPLAY_OFF = 'sudo ddcutil setvcp D6 0x05';
const CMD_DISPLAY_ON = 'sudo ddcutil setvcp D6 0x01';
const SS = 'which ddcutil';

export default defineEventHandler(async (event) => {
  const { cmd } = getQuery(event);
  let finalCommand = '';

  if (cmd === 'turn_off') {
    finalCommand = CMD_DISPLAY_OFF;
  }
  if (cmd === 'turn_on') {
    finalCommand = CMD_DISPLAY_ON;
  }
  if (cmd === 'id') {
    finalCommand = 'id';
  }
  if (cmd === 'pwd') {
    finalCommand = 'pwd';
  }
  if (cmd === 'dd') {
    finalCommand = SS;
  }

  if (!finalCommand) {
    return {};
  }

  const [error, ok] = tryit(execSync)(finalCommand);

  return [error?.message, ok?.toString()];
});
