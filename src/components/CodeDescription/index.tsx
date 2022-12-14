/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  minHeight: number;
  url: string;
}

export default function CodeDescription({
  children,
  minHeight,
}: Props): JSX.Element {
  return (
    <div className={styles.codeDescription} style={{minHeight}}>
      <div className={styles.codeDescriptionBody}>{children}</div>
    </div>
  );
}
