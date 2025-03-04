function Footer() {
  return (
    <div className="col-span-9 text-xl grid grid-cols-8 items-start py-20">
      <section className="col-start-2 col-span-6 font-gluten text-center">
        <h1 className="text-2xl">
          © 2024 Desto Finger Game. All rights reserved.
        </h1>
        <h1 className="mt-2">Made by stealthscripter</h1>
        <div className="w-fit mx-auto flex space-x-4">
          <a href="https://github.com/stealthscripter" target="_blank">
            {" "}
            <img src="./icons/logo-github.svg" alt="" className="size-7" />
          </a>
          <a href="https://www.linkedin.com/in/natnaelayelee/" target="_blank">
            {" "}
            <img src="./icons/logo-linkedin.svg" alt="" className="size-7" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Footer;
