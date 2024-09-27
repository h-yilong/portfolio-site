const SKILLS = [
  '/assets/images/js2.svg',
  '/assets/images/nodejs2.svg',
  '/assets/images/react2.svg',
  '/assets/images/docker2.svg',
  '/assets/images/tailwind2.svg',
  '/assets/images/graphql.svg',
  '/assets/images/figma.svg',
  '/assets/images/ant-design.svg',
  '/assets/images/redux.svg',
  '/assets/images/mui.svg',
  '/assets/images/postman.svg',
  '/assets/images/mongo.svg',

  '/assets/images/js2.svg',
  '/assets/images/nodejs2.svg',
  '/assets/images/react2.svg',
  '/assets/images/docker2.svg',
  '/assets/images/tailwind2.svg',
  '/assets/images/graphql.svg',
  '/assets/images/figma.svg',
  '/assets/images/ant-design.svg',
  '/assets/images/redux.svg',
  '/assets/images/mui.svg',
  '/assets/images/postman.svg',
  '/assets/images/mongo.svg',
  '/assets/images/js2.svg',
  '/assets/images/nodejs2.svg',
  '/assets/images/react2.svg',
  '/assets/images/docker2.svg',
  '/assets/images/tailwind2.svg',
  '/assets/images/graphql.svg',
  '/assets/images/figma.svg',
  '/assets/images/ant-design.svg',
  '/assets/images/redux.svg',
  '/assets/images/mui.svg',
  '/assets/images/postman.svg',
  '/assets/images/mongo.svg',
];

export default function Skills() {
  console.log(
    `%c SKILLS.length `,
    'padding:2px;background:#d51;color:#fff',
    SKILLS.length,
  );
  return (
    <section className="w-screen mt-36 overflow-hidden py-2">
      <div className="w-fit flex gap-3 skill-carousel">
        {SKILLS.map((skill, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/10 rounded-2xl w-20 h-20 flex justify-center items-center p-2 flex-shrink-0 skill-card"
          >
            <img src={skill} alt={skill} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
