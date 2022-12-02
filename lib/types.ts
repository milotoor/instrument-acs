export type ChildProp<C = React.ReactNode> = { children: C };
export type OneOrMore<T> = T | T[];

export namespace Colors {
  type FrontColors = 'cold' | 'occluded' | 'warm' | 'hot';
  type AlertColors = 'danger' | 'info' | 'success' | 'warning';
  export type TextColor = FrontColors | AlertColors;
}

export type ContactMessage = Record<'email' | 'subject' | 'message', string>;
