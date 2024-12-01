import Functionality from "@/components/home/Functionality";
import Intro from "@/components/home/Intro";

export default function Home() {
  return (
  <> 
    <div
      className="w-full  shadow-xl"
      style={{
        background: `
          linear-gradient(135deg, 
            #d8f7ea 0%, 
            #d8f7ea 40%, 
            #e1eeff 60%, 
            #e1eeff 100%
          ),
          linear-gradient(
            to bottom,
            rgba(225, 238, 255, 1) 0%,
            rgba(225, 238, 255, 1) 70%,
            rgba(255, 255, 255, 1) 100%
          )
        `,
        backgroundBlendMode: 'normal, soft-light',
      }}
    >
   <Intro/>
   <Functionality/>

   </div>
  </>
  )
}
