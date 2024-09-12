import { useState } from "react";
import React from "react";
import Team from './Team.jsx';

function Home(){

    const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    { id: 1, name: "Berrah Chouaib", description: "This is a test description", rep: "/src/assets/Chouaib.jpeg" },
    { id: 2, name: "Chehboune Doha", description: "This is a test description", rep: "/src/assets/Doha.jpeg" },
    { id: 3, name: "Moussadeq Hamza", description: "This is a test description", rep: "/src/assets/Hamza1.jpeg" },
    { id: 4, name: "Bentaleb Meriem", description: "This is a test description", rep: "/src/assets/Meriem.jpeg" },
    { id: 5, name: "Machay Hamza", description: "This is a test description", rep: "/src/assets/Hamza2.jpg" },
    
  ];

    return(
    <>
        <header className="bg-gradient-to-b from-indigo-900 to-black text-white font-['Poppins']">
            <nav className="flex justify-between items-center py-1 px-5 mx-auto">
                <div className="flex items-center">
                    <img className="max-w-20"src="\src\assets\logo_favicon.png" alt="logo_here" />
                    <span className="font-bold text-lg">Sign Call</span>
                </div>
                <ul className="flex gap-5">
                    <li><a href="#">Home</a></li>
                    <li><a href="#servicescroll">Service</a></li>
                    <li><a href="#aboutscroll">About</a></li>
                    <li><a href="#contactscroll">Contact</a></li>
                </ul>
            </nav>
            <div className="flex flex-col items-center text-center mt-20">
              <div className="pt-10">
                  <h1 className="text-4xl font-bold">Communicate with the <span>deaf</span> the same way you do with the <span>rest</span>.</h1>
                  <p className="text-md mt-5 text-slate-300">A motivated group eager to build projects to help people with health conditions. </p>    
              </div>
              <button className=" my-16 p-6 px-9 text-lg font-bold border-2 border-white rounded-lg "><a href="/room">Get started</a></button>
          </div>
        </header>
        <body>
        <div className="grid grid-cols-2 font-['Poppins'] bg-[#5356FF] items-center" id='servicescroll'>
              
                <img className="" src="\src\assets\service.webp" alt="service-image" />              
                <div className="flex flex-col p-2 justify-center">
                    <h1 className="text-3xl mb-5 px-8 pb-3 text-zinc-100">Sign Language Video Call</h1>
                    <p className="text-justify mx-5 font-medium leading-relaxed">We offer an innovative video calling service designed to bridge the communication gap for the deaf and hard-of-hearing community. Utilizing advanced sign language detection technology, our platform ensures that every gesture and sign is accurately recognized and translated in real-time, enabling seamless conversations. With a user-friendly interface and robust support for various sign languages, our goal is to empower individuals to connect, communicate, and collaborate effortlessly, regardless of hearing abilities.</p>
                </div>
        </div>
        <div className="pt-5 pb-20 bg-slate-200" id='aboutscroll'>
            <h1 className="font-sans text-center text-5xl font-medium p-5 pb-20">Our Team</h1>
            <div className="flex justify-center gap-7">
            {teamMembers.map((member) => (
        <Team
          key={member.id}
          name={member.name}
          description={member.description}
          rep={member.rep}
          zoomState={hoveredCard === member.id ? 'scale-110' : hoveredCard ? '' : ''}
          onMouseEnter={() => setHoveredCard(member.id)}
          onMouseLeave={() => setHoveredCard(null)}
        />
      ))}  
             </div>
        </div>
        </body>
        <footer className="bg-stone-900 text-stone-400 p-16 pr-0 pb-2"id='contactscroll'>
          <h1 className="text-5xl ml-20">Contacts</h1>
          <div class="flex justify-center  mt-10 leading-10 gap-5 mb-20 text-lg">
            <div className="flex gap-20">
              <div className="">
                <p>Berrah Chouaib</p>
                <p>Chehboune Doha</p>
                <p>Moussadeq Hamza</p>
                <p>Bentaleb Meriem</p>
                <p>Machay Hamza</p>
              </div>
              <div className="">
                <p>chouaibo1997@gmail.com</p>
                <p>dohacheh2003@gmail.com</p>
                <p>Moussadeq Hamza</p>
                <p>meriembentaleb02@gmail.com</p>
                <p>Machay Hamza</p>
              </div>
            </div>
            <div className="border-2 mx-10  border-stone-400 rounded-sm"></div>
            <div className="flex gap-20">
              <div className="">
                <p>Aissam Bekkari</p>
              </div>
              <div className="">
                <p>a_bekkari@yahoo.fr</p>
              </div>
            </div>
          </div>
          <div className="text-center">
          <div>Copyright &copy; 2024, Ensa Marrakech. All Rights Reserved.</div>
          </div>
        </footer>
    </>
    );
}
export default Home