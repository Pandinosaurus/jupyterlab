// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/multiplex';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/stex/stex';

/**
 * Define an IPython GFM (GitHub Flavored Markdown) mode.
 *
 * Is just a slightly altered GFM Mode with support for LaTeX.
 * LaTeX support was supported by Codemirror GFM as of
 *   https://github.com/codemirror/CodeMirror/pull/567
 *  But was later removed in
 *   https://github.com/codemirror/CodeMirror/commit/d9c9f1b1ffe984aee41307f3e927f80d1f23590c
 */
CodeMirror.defineMode(
  'ipythongfm',
  (config: CodeMirror.EditorConfiguration, modeOptions?: any) => {
    const gfmMode = CodeMirror.getMode(config, {
      name: 'gfm',
      // Override list3 with an under-used token, rather than `keyword`
      tokenTypeOverrides: { list3: 'string-2' }
    });
    const texMode = CodeMirror.getMode(config, {
      name: 'stex',
      inMathMode: true
    });

    return CodeMirror.multiplexingMode(
      gfmMode,
      {
        open: '$$',
        close: '$$',
        mode: texMode,
        delimStyle: 'delimit'
      },
      {
        open: '$',
        close: '$',
        mode: texMode,
        delimStyle: 'delimit'
      },
      {
        open: '\\(',
        close: '\\)',
        mode: texMode,
        delimStyle: 'delimit'
      },
      {
        open: '\\[',
        close: '\\]',
        mode: texMode,
        delimStyle: 'delimit'
      }
      // .. more multiplexed styles can follow here
    );
  },
  'gfm'
);

CodeMirror.defineMIME('text/x-ipythongfm', 'ipythongfm');
CodeMirror.modeInfo.push({
  ext: [],
  mime: 'text/x-ipythongfm',
  mode: 'ipythongfm',
  name: 'ipythongfm'
});
