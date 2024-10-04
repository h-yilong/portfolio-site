const SKILLS = [
  "/assets/images/js2.svg",
  "/assets/images/nodejs2.svg",
  "/assets/images/react2.svg",
  "/assets/images/docker2.svg",
  "/assets/images/tailwind2.svg",
  "/assets/images/graphql.svg",
  "/assets/images/figma.svg",
  "/assets/images/ant-design.svg",
  "/assets/images/redux.svg",
  "/assets/images/mui.svg",
  "/assets/images/postman.svg",
  "/assets/images/mongo.svg",

  "/assets/images/js2.svg",
  "/assets/images/nodejs2.svg",
  "/assets/images/react2.svg",
  "/assets/images/docker2.svg",
  "/assets/images/tailwind2.svg",
  "/assets/images/graphql.svg",
  "/assets/images/figma.svg",
  "/assets/images/ant-design.svg",
  "/assets/images/redux.svg",
  "/assets/images/mui.svg",
  "/assets/images/postman.svg",
  "/assets/images/mongo.svg",
  "/assets/images/js2.svg",
  "/assets/images/nodejs2.svg",
  "/assets/images/react2.svg",
  "/assets/images/docker2.svg",
  "/assets/images/tailwind2.svg",
  "/assets/images/graphql.svg",
  "/assets/images/figma.svg",
  "/assets/images/ant-design.svg",
  "/assets/images/redux.svg",
  "/assets/images/mui.svg",
  "/assets/images/postman.svg",
  "/assets/images/mongo.svg",
];

export default function Skills() {
  console.log(`%c SKILLS.length `, "padding:2px;background:#d51;color:#fff", SKILLS.length);
  return (
    <section className="mt-36 w-screen overflow-hidden py-2">
      <div className="skill-carousel flex w-fit gap-3">
        {SKILLS.map((skill, index) => (
          <div
            key={index}
            className="skill-card flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 p-2"
          >
            <img src={skill} alt={skill} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
