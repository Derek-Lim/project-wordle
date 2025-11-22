import React from 'react';

import Banner from '../Banner';

function LostBanner({ answer, action }) {
  return (
    <Banner status="sad" action={action} actionText="Restart game">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </Banner>
  );
}

export default LostBanner;
