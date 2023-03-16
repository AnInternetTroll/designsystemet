import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <Image
          src='/img/logo-negative.svg'
          alt='Logo'
          width={275}
          height={28}
        />
      </Container>
    </footer>
  );
};

export { Footer };
