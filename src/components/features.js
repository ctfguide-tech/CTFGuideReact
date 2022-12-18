
export function Features() {
  return (
    <div className="relative overflow-hidden bg-b;acl pt-16 ">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <i class="fas fa-bolt text-white text-2xl"></i>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">The platform for everything CTF</h2>
                <p className="mt-4 text-lg text-gray-400">
                     
                Loads of community uploaded challenges from varying difficulties for you to practice. All these challenges can be solved right in the browser with our terminals.




                </p>
           
              </div>
            </div>
            <div className="mt-8 bg-gray-900 py-6 rounded-lg border border-gray-600 px-5">
              <blockquote>
                <div>
                  <p className="text-base text-gray-400">
                    &ldquo;Been using this for over a year, gotta say it's extremely nice to have a easy to use platform.&rdquo;
                  </p>
                </div>
                <footer className="mt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-6 w-6 rounded-full"
                        src="https://ph-avatars.imgix.net/2749935/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=1"
                        alt=""
                      />
                    </div>
                    <div className="text-base font-medium text-gray-400">smashmaster <a className="text-sm italic" href="https://www.producthunt.com/products/ctfguide#ctfguide">via ProductHunt</a></div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
          <div className="c2 mx-auto max-w-xl px-6 lg:mx-0 sm:collapse  lg:visible  lg:mt-0  lg:py-16 lg:px-0">
          <img
                id="i2"
                className="i2 rounded-xl  ring-1 ring-black ring-opacity-5 lg:absolute  lg:max-w-none "
                width={590}
                src="./screenshot1.png"
                alt="Inbox user interface"
              />
          </div>

        </div>
      </div>
    
    </div>
  )
}
