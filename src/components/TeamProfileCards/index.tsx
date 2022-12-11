/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import React, {type ReactNode} from 'react';
 import Translate from '@docusaurus/Translate';
 import Link from '@docusaurus/Link';
 
 function WebsiteLink({to, children}: {to: string; children?: ReactNode}) {
   return (
     <Link to={to}>
       {children ?? (
         <Translate id="team.profile.websiteLinkLabel">website</Translate>
       )}
     </Link>
   );
 }
 
 type ProfileProps = {
   className?: string;
   name: string;
   children: ReactNode;
   githubUrl: string;
   linkedinUrl?: string;
 };
 
 function TeamProfileCard({
   className,
   name,
   children,
   githubUrl,
   linkedinUrl,
 }: ProfileProps) {
   return (
     <div className={className}>
       <div className="card card--full-height">
         <div className="card__header">
           <div className="avatar avatar--vertical">
             <img
               className="avatar__photo avatar__photo--xl"
               src={`${githubUrl}.png`}
               alt={`${name}'s avatar`}
             />
             <div className="avatar__intro">
               <h3 className="avatar__name">{name}</h3>
             </div>
           </div>
         </div>
         <div className="card__body">{children}</div>
         <div className="card__footer">
           <div className="button-group button-group--block">
             {githubUrl && (
               <a className="button button--secondary" href={githubUrl}>
                 GitHub
               </a>
             )}
             {linkedinUrl && (
               <a className="button button--secondary" href={linkedinUrl}>
                 LinkedIn
               </a>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 function TeamProfileCardCol(props: ProfileProps) {
   return (
     <TeamProfileCard {...props} className="col col--6 margin-bottom--lg" />
   );
 }
 
 export function MainAuthorRow(): JSX.Element {
   return (
     <div className="row">
       <TeamProfileCardCol
         name="Jongseob Jeon"
         githubUrl="https://github.com/aiden-jeon"
         linkedinUrl="https://www.linkedin.com/in/jongseob-jeon/"
         >
         <Translate id="team.profile.Jongseob Jeon.body">
         Project Leader
         </Translate>
       </TeamProfileCardCol>
       <TeamProfileCardCol
         name="Dongmin Lee"
         githubUrl="https://github.com/dongminlee94"
         >
         <Translate id="team.profile.Dongmin Lee.body">
         Project Member
         </Translate>
       </TeamProfileCardCol>
       <TeamProfileCardCol
         name="Donghyun Kim"
         githubUrl="https://github.com/Kimdongui"
         linkedinUrl="https://www.linkedin.com/in/donghyun-kim-549718215/"
         >
         <Translate id="team.profile.Donghyun Kim.body">
         Project Member
         </Translate>
       </TeamProfileCardCol>
       <TeamProfileCardCol
         name="Seokgi Kim"
         githubUrl="https://github.com/datawhales"
         >
         <Translate id="team.profile.Seokgi Kim.body">
         Project Member
         </Translate>
       </TeamProfileCardCol>
     </div>
   );
 }
 
 export function ReviewersRow(): JSX.Element {
   return (
     <div className="row">
       <TeamProfileCardCol
         name="Minjoo Lee"
         githubUrl="https://github.com/LEEMINJOO"
         linkedinUrl="https://www.linkedin.com/in/minjoolee218/"
         >
         <Translate id="team.profile.Minjoo Lee.body">
         Project Leader
         </Translate>
       </TeamProfileCardCol>
     </div>
   );
 }
 