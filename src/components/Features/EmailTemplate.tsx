import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>{firstName}</p>
    </div>
  );
}