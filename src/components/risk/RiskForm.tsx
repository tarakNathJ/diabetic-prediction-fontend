// import React, { useId } from 'react';
// import { Card } from '../ui/Card';
// import AgeInput from './inputs/AgeInput';
// import BinaryInput from './inputs/BinaryInput';
// import BMIInput from './inputs/BMIInput';
// import BloodLevelInput from './inputs/BloodLevelInput';
// import { useRiskStore } from '../../store/riskStore';
// import { ArrowRight } from 'lucide-react';
// import { useProfileStore } from '../../store/profileStore';
// import { useSelector } from 'react-redux';



// export default function RiskForm() {
//   const UserID = useSelector((state : any)=>state.ProfileData)
//   const { calculateRisk ,setUserId } = useRiskStore();
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setUserId(UserID.data._id);
//     calculateRisk();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-6">
//         <Card className="p-6">
//           <AgeInput />
//         </Card>

//         <Card className="p-6">
//           <BinaryInput
//             title="Hypertension"
//             description="Have you been diagnosed with high blood pressure?"
//             name="hypertension"
//           />
//         </Card>

//         <Card className="p-6">
//           <BinaryInput
//             title="Heart Disease"
//             description="Do you have any history of heart disease?"
//             name="heartDisease"
//           />
//         </Card>

//         <Card className="p-6">
//           <BMIInput />
//         </Card>

//         <Card className="p-6">
//           <BloodLevelInput
//             title="HbA1c Level"
//             description="Glycated hemoglobin level indicates your average blood sugar level"
//             name="hba1c"
//             unit="%"
//             min={4}
//             max={12}
//             step={0.1}
//           />
//         </Card>

//         <Card className="p-6">
//           <BloodLevelInput
//             title="Blood Glucose Level"
//             description="Your current blood glucose level"
//             name="glucose"
//             unit="mg/dL"
//             min={70}
//             max={200}
//             step={1}
//           />
//         </Card>

//         <button
//           type="submit"
//           className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl transition-colors"
//         >
//           Calculate Risk
//           <ArrowRight className="w-5 h-5" />
//         </button>
//       </div>
//     </form>
//   );
// }



import React, { useState } from 'react';
import { Card } from '../ui/Card';
import AgeInput from './inputs/AgeInput';
import BinaryInput from './inputs/BinaryInput';
import BMIInput from './inputs/BMIInput';
import BloodLevelInput from './inputs/BloodLevelInput';
import { useRiskStore } from '../../store/riskStore';
import { ArrowRight, Bot, Sparkles, Power, X, Loader2, Server } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function RiskForm() {
  const UserID = useSelector((state : any)=>state.ProfileData)
  const { calculateRisk , setUserId , setModelName } = useRiskStore();
  const [showServerPopup, setShowServerPopup] = useState(false);
  const [isStartingServer, setIsStartingServer] = useState(false);
  const [isServerReady, setIsServerReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserId(UserID.data._id);
    calculateRisk();
  };

  const handleGeminiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModelName("GEMINI_MODEL");
    setUserId(UserID.data._id);
    calculateRisk();
  }

  const handleCustomAIClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModelName("CUSTOM_AI_MODEL");
    setShowServerPopup(true);
  };

  const startServer = async () => {
    setIsStartingServer(true);
    // Simulate server startup - replace with actual API call

    try {
      const Responce = await axios.get(`${import.meta.env.VITE_SERVER_URL}/health`);
      if (Responce.data.status === "ok") {
        setIsServerReady(true);
        setIsStartingServer(false);
      }
    } catch (error) {
      setIsServerReady(false);
      setIsStartingServer(false);
      if (axios.isAxiosError(error)) {

        console.log(error);
        return
      }

    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="p-6">
          <AgeInput />
        </Card>

        <Card className="p-6">
          <BinaryInput
            title="Hypertension"
            description="Have you been diagnosed with high blood pressure?"
            name="hypertension"
          />
        </Card>

        <Card className="p-6">
          <BinaryInput
            title="Heart Disease"
            description="Do you have any history of heart disease?"
            name="heartDisease"
          />
        </Card>

        <Card className="p-6">
          <BMIInput />
        </Card>

        <Card className="p-6">
          <BloodLevelInput
            title="HbA1c Level"
            description="Glycated hemoglobin level indicates your average blood sugar level"
            name="hba1c"
            unit="%"
            min={4}
            max={12}
            step={0.1}
          />
        </Card>

        <Card className="p-6">
          <BloodLevelInput
            title="Blood Glucose Level"
            description="Your current blood glucose level"
            name="glucose"
            unit="mg/dL"
            min={70}
            max={300}
            step={1}
          />
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleCustomAIClick}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-purple-500/50 group-hover:scale-110 transition-transform duration-300" />
            <Bot className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Custom AI Model</span>
          </button>

          <button
              onClick={handleGeminiClick}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl transition-colors group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-500/50 group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Gemini Model</span>
          </button>
        </div>
      </div>

      {/* Server Startup Popup */}
      {showServerPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md">
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden animate-fadeIn">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -ml-16 -mb-16" />

              {/* Content */}
              <div className="relative p-6">
                <button
                  onClick={() => setShowServerPopup(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-xl">
                    <Server className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Server Startup Required</h3>
                </div>

                <p className="text-gray-300 mb-6">
                  The Custom AI Model runs on a free server that needs to be started before making predictions. This may take a few moments, but it's necessary to provide you with accurate results.
                </p>

                <div className="space-y-4">
                  {!isServerReady ? (
                    <button
                      onClick={startServer}
                      disabled={isStartingServer}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isStartingServer ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Starting Server...
                        </>
                      ) : (
                        <>
                          <Power className="w-5 h-5" />
                          Start Server
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowServerPopup(false);
                        handleSubmit(new Event('submit') as any);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl transition-colors"
                    >
                      <Bot className="w-5 h-5" />
                      Continue with Prediction
                    </button>
                  )}
                </div>

                {isStartingServer && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      <p className="text-sm text-gray-400">Initializing AI model...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}