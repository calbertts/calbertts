import React from 'react';
import _ from 'lodash';

import {htmlToReact, Link, classNames, safePrefix} from '../utils';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer inner-sm">
              <p className="site-info">
                {_.get(this.props, 'pageContext.site.siteMetadata.footer.content') && 
                <span className="copyright">{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content'))}</span>
                }
                {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links'), (action, action_idx) => (
                <Link key={action_idx} className={classNames({'button': _.get(action, 'type') === 'button'})} to={safePrefix(_.get(action, 'url'))}{...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}>{_.get(action, 'label')}</Link>
                ))}
              </p>
              <Link id="to-top" className="to-top" to="#page"><span className="icon-arrow-up" aria-hidden="true" /><span
                  className="screen-reader-text">Back to top</span></Link>
            </footer>
        );
    }
}
