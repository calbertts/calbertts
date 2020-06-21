import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {getPages, Link, safePrefix} from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPosts extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        let recent_posts = display_posts.slice(0, _.get(section, 'posts_number'));
        return (
            <section id={_.get(section, 'section_id')} className="block block-posts">
              {_.get(section, 'title') && 
              <h2 className="block-title underline inner-sm">{_.get(section, 'title')}</h2>
              }
              <div className="post-feed">
                <div className="post-feed-inside">
                  {_.map(recent_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-inside">
                      {_.get(post, 'frontmatter.thumb_img_path') && 
                      <Link className="post-thumbnail" to={safePrefix(_.get(post, 'url'))}><img src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} /></Link>
                      }
                      <header className="post-header">
                        <h3 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h3>
                      </header>
                      {_.get(post, 'frontmatter.excerpt') && 
                      <div className="post-content">
                        <p>{_.get(post, 'frontmatter.excerpt')}</p>
                      </div>
                      }
                      <footer className="post-meta">
                        <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                      </footer>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
              {_.get(section, 'actions') && 
              <div className="block-buttons inner-sm">
                <CtaButtons {...this.props} actions={_.get(section, 'actions')} />
              </div>
              }
            </section>
        );
    }
}
