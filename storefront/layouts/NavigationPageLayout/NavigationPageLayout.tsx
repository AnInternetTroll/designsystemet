import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Picture } from '@navikt/ds-icons';

import type { NavigationCardProps } from '../../components/NavigationCard/NavigationCard';
import { NavigationCard } from '../../components/NavigationCard/NavigationCard';
import Header from '../../components/Header/Header';

import classes from './NavigationPageLayout.module.css';

type PageItem = NavigationCardProps;

type PageSection = {
  title: string;
  description: string;
  items: PageItem[];
};

type PageLandingLayoutData = {
  title: string;
  description: string;
  sections: PageSection[];
};

type MenuData = {
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  name: string;
  children: MenuItem[];
};

interface PageLandingLayoutProps {
  Content: React.ReactNode;
  data: PageLandingLayoutData;
  menu: MenuData;
}

const NavigationPageLayout = ({
  Content,
  data,
  menu,
}: PageLandingLayoutProps) => {
  return (
    <div>
      <Header />
      {Content}
      <div className={classes.content}>
        <Container>
          <Row>
            <Col md={2}>
              {/*<SidebarMenu*/}
              {/*  title='ff'*/}
              {/*  items={menu}*/}
              {/*/>*/}

              <div>
                {menu.items.map((item, index) => (
                  <div key={index}>
                    <div>{item.name}</div>
                    <div>
                      {item.children &&
                        item.children.map((item2, index2) => (
                          <div key={index2}>
                            <div>--{item2.name}</div>
                            <div>
                              {item2.children &&
                                item2.children.map((item3, index3) => (
                                  <div key={index3}>
                                    <div>----{item3.name}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col
              md={10}
              className={classes.test}
            >
              <h1 className={classes.title}>{data.title}</h1>
              <p className={classes.desc}>{data.description}</p>

              <div className={classes.sections}>
                {data.sections.map((item, index: number) => (
                  <div
                    className={classes.section}
                    key={index}
                  >
                    <h2>{item.title}</h2>
                    <p className={classes['section-desc']}>
                      {item.description}
                    </p>
                    <Row
                      className='gy-4'
                      key={index}
                    >
                      {item.items.map((item, index: number) => (
                        <Col
                          key={index}
                          md={4}
                        >
                          <NavigationCard
                            backgroundColor='grey'
                            title={item.title}
                            color={item.color}
                            description='dd'
                            icon={<Picture fontSize={28} />}
                            url={item.url}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export { NavigationPageLayout };
export type { PageLandingLayoutData };
