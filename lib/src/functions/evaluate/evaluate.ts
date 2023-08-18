import { logger } from '../../helpers/logger.js';
import { isBrowser } from '../is-browser.js';
import { isEditing } from '../is-editing.js';
import type { BuilderGlobals, ExecutorArgs } from './helpers.js';
import { getUserAttributes } from '../track/helpers.js';
import { evaluator } from 'placeholder-runtime';
export type EvaluatorArgs = Omit<ExecutorArgs, 'builder' | 'event'> & {
  event?: Event;
  isExpression?: boolean;
};
export function evaluate({
  code,
  context,
  localState,
  rootState,
  rootSetState,
  event,
  isExpression = true
}: EvaluatorArgs): any {
  if (code === '') {
    logger.warn('Skipping evaluation of empty code block.');
    return;
  }
  const builder: BuilderGlobals = {
    isEditing: isEditing(),
    isBrowser: isBrowser(),
    isServer: !isBrowser(),
    getUserAttributes: () => getUserAttributes()
  };

  // Be able to handle simple expressions like "state.foo" or "1 + 1"
  // as well as full blocks like "var foo = "bar"; return foo"
  const useReturn =
  // we disable this for cases where we definitely don't want a return
  isExpression && !(code.includes(';') || code.includes(' return ') || code.trim().startsWith('return '));
  const useCode = useReturn ? `return (${code});` : code;
  const args: ExecutorArgs = {
    code: useCode,
    builder,
    context,
    event,
    rootSetState,
    rootState,
    localState
  };
  try {
    return evaluator(args);
  } catch (e: any) {
    logger.error('Failed code evaluation: ' + e.message, {
      code
    });
    return undefined;
  }
}