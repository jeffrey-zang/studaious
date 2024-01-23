import "../Edit/Edit.scss";
import { useState } from "react";
import { generate } from "../../utils/cohere";
import { Skeleton } from 'antd';
import { Oval } from 'react-loader-spinner'

const Minimal = () => {

  const [text, setText] = useState("Venture capital (VC) is a form of private equity financing that is provided by firms or funds to startup, early-stage, and emerging companies that have been deemed to have high growth potential or which have demonstrated high growth (in terms of number of employees, annual revenue, scale of operations, etc.). Venture capital firms or funds invest in these early-stage companies in exchange for equity, or an ownership stake. Venture capitalists take on the risk of financing risky start-ups in the hopes that some of the companies they support will become successful. Because startups face high uncertainty, VC investments have high rates of failure. The start-ups are usually based on an innovative technology or business model and they are usually from high technology industries, such as information technology (IT), clean technology or biotechnology.");

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Generate");

  const [generated, setGenerated] = useState([]);

  return (
    <div className='flex items-center px-8 pb-8 bg-white'>
      <div className="edit w-1/3 border-r-[1px] border-r-[#ddd]">
        <h1>
          Your Note
          {/* <p className='font-normal text-neutral-500 text-sm'>Ideally, use a paragraph at least 800 characters long</p> */}
        </h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          placeholder="Type something..."
        />
        {/* <p className='text-neutral-500 text-sm'>{text.length}c</p> */}
        <button 
          className={`bg-blue-200 mr-12 border-[1px] border-blue-300 ${loading ? "show no" : "hide"} ${success ? "success" : success == false ? "failure" : ""}`}
          onClick={
            async () => {
              if (!loading && text.length >= 800) {
                setLoading(true);
                setGenerated([]);
                setLoadingMsg(
                  (
                    <div className='flex items-center gap-8'>
                      <Oval 
                        height='40'
                        width='40'
                        color='#000000'
                        secondaryColor="#555555"
                      />
                      Generating...
                    </div>
                  )
                );
                setSuccess(null);
                try {
                  const output = await generate(text);
                  setGenerated(JSON.parse('[' + output.generations[0].text.split('[')[1].split(']')[0] + ']'));
                  setSuccess(true);
                  setLoadingMsg("Complete!");
                } catch (err) {
                  setSuccess(false);
                  setLoadingMsg("Error!");
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }  
            }
          }
          disabled={loading || text.length < 800}
        >
          {loadingMsg}
        </button>
      </div>
      <div className="edit w-2/3">
        <h1>
          Practice Questions
          {/* <p className='font-normal text-neutral-500 text-sm'>Click to reveal</p> */}
        </h1>
        <div className='gap-4 flex flex-col overflow-y-scroll overflow-x-hidden'>
          {(generated.length == 0 || loading) ? 
            <div className='flex flex-col gap-4'>
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
            </div>
            :
            null
          }
          {generated.map(
            (item, index) => {
              return (
                <div key={index} className='p-4 border-neutral-200 border-[1px] rounded-md'>
                  <p className='font-bold'>
                    {item.question}
                  </p>
                  <p className='text-sm active:bg-white active:text-neutral-700 transition-colors bg-neutral-100 text-neutral-100 cursor-pointer duration-300'>
                    {item.answer}
                  </p>
                </div>
              )
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Minimal;