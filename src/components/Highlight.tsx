/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';


export function Part({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <span
      style={{
        backgroundColor: '#9747FF',
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}

export function Chapter({
  children,
}: {
  children: ReactNode;
  color: string;
}): JSX.Element {
  return (
    <span
      style={{
        backgroundColor: '#6A77D7',
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}
