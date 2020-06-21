import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, classNames} from '../utils';

export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className={'site-header ' + _.get(this.props, 'pageContext.site.siteMetadata.header.background')}>
              <div className="site-header-wrap">
                <div className="site-header-inside">
                  <div className="site-branding">
                    {_.get(this.props, 'pageContext.site.siteMetadata.header.profile_img') && 
                    <p className="profile">
                      <Link to={safePrefix('/')}><img src={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.profile_img'))}
                          className="avatar" alt="Author Avatar" /></Link>
                    </p>
                    }
                    <div className="site-identity">
                      <p className="site-title"><Link to={safePrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title')}</Link></p>
                      {_.get(this.props, 'pageContext.site.siteMetadata.header.tagline') && 
                      <p className="site-description">{_.get(this.props, 'pageContext.site.siteMetadata.header.tagline')}</p>
                      }
                    </div>
                    {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav') || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social')) && 
                    <button id="menu-toggle" className="menu-toggle"><span className="screen-reader-text">Menu</span><span className="icon-menu"
                        aria-hidden="true" /></button>
                    }
                  </div>
                  {(_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav') || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social')) && 
                  <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                    <div className="site-nav-wrap">
                      <div className="site-nav-inside">
                        {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav') && 
                        <ul className="menu">
                          {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links'), (action, action_idx) => (
                          <li key={action_idx} className={classNames('menu-item', {'current-menu-item': _.get(this.props, 'pageContext.url') === _.get(action, 'url'), 'menu-button': _.get(action, 'type') === 'button'})}>
                            <Link className={classNames({'button': _.get(action, 'type') === 'button'})} to={safePrefix(_.get(action, 'url'))}{...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}>{_.get(action, 'label')}</Link>
                          </li>
                          ))}
                        </ul>
                        }
                        {_.get(this.props, 'pageContext.site.siteMetadata.header.has_social') && 
                        <div className="social-links">
                          {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.social_links'), (action, action_idx) => (
                          action && 
                          <Link key={action_idx} className={classNames({'button button-icon': _.get(action, 'type') === 'icon'})} to={safePrefix(_.get(action, 'url'))}{...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}>
                            {((_.get(action, 'type') === 'icon') && _.get(action, 'icon_class')) ? <React.Fragment>
                            <span className={'fab ' + _.get(action, 'icon_class')} aria-hidden="true"/><span className="screen-reader-text">{_.get(action, 'label')}</span>
                            </React.Fragment> : 
                            _.get(action, 'label')
                            }
                          </Link>
                          ))}
                        </div>
                        }
                      </div>
                    </div>
                  </nav>
                  }
                </div>
              </div>
            </header>
        );
    }
}
