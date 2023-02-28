import classes from './Section.module.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import cn from 'classnames';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  backgroundColor?: 'white' | 'grey';
  detail?: 'diamond';
}

const Section = ({
  children,
  title,
  backgroundColor = 'grey',
  detail,
}: SectionProps) => {
  return (
    <div className={cn(classes.section, classes[backgroundColor])}>
      <Container>
        <div className={classes.header}>
          {title && <h2 className={classes.title}>{title}</h2>}
          {detail && (
            <img
              src='img/diamond-logo.svg'
              alt=''
              className={classes.detail}
            />
          )}
        </div>
        <div className={classes.content}>{children}</div>
      </Container>
    </div>
  );
};

export default Section;
