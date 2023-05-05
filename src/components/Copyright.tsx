import React from 'react';
import { Stack } from 'rsuite';

const Copyright = () => {
  return (
    <Stack className="copyright" justifyContent="center" style={{ height: 40, marginTop: 20 }}>
      <div className="container">
        <p>
          © 2022, Copyright{' '}
          <a href="https://github.com/trakwell-ai" target="_blank" rel="noreferrer">
            Trakwell.ai
          </a>
        </p>
      </div>
    </Stack>
  );
};

export default Copyright;
