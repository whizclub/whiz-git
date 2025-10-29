'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Trophy, AlertCircle, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import toast from 'react-hot-toast';

interface PETScoreResult {
  run1600Score: number;
  run100Score: number;
  longJumpScore: number;
  totalScore: number;
  isDisqualified?: boolean;
  disqualificationReason?: string;
  isImpossible?: boolean;
  impossibleMessage?: string;
}

export function PETScoreCalculator() {
  const [minutes1600, setMinutes1600] = useState('');
  const [seconds1600, setSeconds1600] = useState('');
  const [seconds100, setSeconds100] = useState('');
  const [longJump, setLongJump] = useState('');
  const [result, setResult] = useState<PETScoreResult | null>(null);
  const [showGradation, setShowGradation] = useState(false);

  const calculate1600Marks = (totalSeconds: number): number => {
    if (totalSeconds <= 240) return 40; // 4:00 and less
    if (totalSeconds <= 270) return 36; // 4:01-4:30
    if (totalSeconds <= 300) return 32; // 4:31-5:00
    if (totalSeconds <= 330) return 28; // 5:01-5:30
    if (totalSeconds <= 360) return 25; // 5:31-6:00
    if (totalSeconds <= 390) return 22; // 6:01-6:30
    if (totalSeconds <= 420) return 19; // 6:31-7:00
    if (totalSeconds <= 450) return 17; // 7:01-7:30
    if (totalSeconds <= 480) return 15; // 7:31-8:00
    if (totalSeconds <= 510) return 13; // 8:01-8:30
    if (totalSeconds <= 540) return 11; // 8:31-9:00
    if (totalSeconds <= 570) return 10; // 9:01-9:30
    return 0; // Beyond qualifying time
  };

  const calculate100Marks = (seconds: number): number => {
    if (seconds <= 10.50) return 30;
    if (seconds <= 11.00) return 27;
    if (seconds <= 11.50) return 24;
    if (seconds <= 12.00) return 21;
    if (seconds <= 12.50) return 19;
    if (seconds <= 13.00) return 17;
    if (seconds <= 13.50) return 15;
    if (seconds <= 14.00) return 13;
    if (seconds <= 14.50) return 11;
    if (seconds <= 15.00) return 10;
    if (seconds <= 15.50) return 9;
    if (seconds <= 16.00) return 8;
    if (seconds <= 16.50) return 7;
    return 0; // Beyond qualifying time
  };

  const calculateLongJumpMarks = (meters: number): number => {
    if (meters >= 5.61) return 30;
    if (meters >= 5.41) return 27;
    if (meters >= 5.21) return 24;
    if (meters >= 5.01) return 21;
    if (meters >= 4.81) return 19;
    if (meters >= 4.61) return 17;
    if (meters >= 4.41) return 15;
    if (meters >= 4.21) return 13;
    if (meters >= 4.01) return 11;
    if (meters >= 3.80) return 10;
    if (meters >= 3.65) return 9;
    return 0; // Below qualifying distance
  };

  const handleCalculate = () => {
    const min = parseInt(minutes1600) || 0;
    const sec = parseInt(seconds1600) || 0;
    const totalSeconds1600 = min * 60 + sec;
    
    const seconds100Value = parseFloat(seconds100) || 0;
    const longJumpValue = parseFloat(longJump) || 0;

    // Check for impossible timing (4 minutes or below)
    if (totalSeconds1600 > 0 && totalSeconds1600 <= 240) {
      const funnyMessages = [
        "Whoa there, Usain Bolt! 🏃‍♂️💨 Did you use a rocket? That's faster than humanly possible!",
        "Are you sure you didn't confuse 1600m with 160m? 🤔 Because that's literally impossible!",
        "Congratulations! You've just broken the world record... and the laws of physics! 🚀",
        "That timing makes Cheetahs jealous! 🐆 Please enter a realistic time.",
        "Did you teleport? 🌟 Because even Olympic champions can't run that fast!",
        "Plot twist: You're actually The Flash! ⚡ But for mere mortals, please enter a realistic time."
      ];
      const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      
      setResult({
        run1600Score: 0,
        run100Score: 0,
        longJumpScore: 0,
        totalScore: 0,
        isImpossible: true,
        impossibleMessage: randomMessage
      });
      return;
    }

    const run1600Score = calculate1600Marks(totalSeconds1600);
    const run100Score = calculate100Marks(seconds100Value);
    const longJumpScore = calculateLongJumpMarks(longJumpValue);
    const totalScore = run1600Score + run100Score + longJumpScore;

    // Check if failed in 1600m (mandatory qualification)
    if (totalSeconds1600 > 570) {
      setResult({
        run1600Score: 0,
        run100Score,
        longJumpScore,
        totalScore: 0,
        isDisqualified: true,
        disqualificationReason: "⚠️ DISQUALIFIED: Qualifying in the 1600m run is MANDATORY. You must complete it within 9:30 minutes to proceed. Keep training and try again! 💪"
      });
      return;
    }

    setResult({
      run1600Score,
      run100Score,
      longJumpScore,
      totalScore
    });
  };

  const handleReset = () => {
    setMinutes1600('');
    setSeconds1600('');
    setSeconds100('');
    setLongJump('');
    setResult(null);
  };

  const handleShareScore = async () => {
    if (!result || result.isImpossible || result.isDisqualified) {
      toast.error('Please calculate a valid score first!');
      return;
    }

    const shareText = `I scored ${result.totalScore}/100 on WhizClub's PET Calculator! 🏃‍♂️\n1600m: ${result.run1600Score}/40 | 100m: ${result.run100Score}/30 | Long Jump: ${result.longJumpScore}/30\n\nCalculate your score at: https://whizclub.com`;
    
    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My PET Score - WhizClub',
          text: shareText,
        });
        toast.success('Thanks for sharing!');
        return;
      } catch (err) {
        // User cancelled or share failed
      }
    }
    
    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Score copied to clipboard! Share it with your friends!');
    } catch (err) {
      toast.error('Unable to share. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-6 bg-white shadow-xl border-2 border-blue-100">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">PET Score Calculator</h3>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700 flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
            <span>
              <strong>Note:</strong> This calculator is for APSP & AR positions where all three events count for marks. 
              For Civil positions, you must qualify in 1600m run and any ONE other event.
            </span>
          </p>
        </div>

        {/* Gradation Table Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowGradation(!showGradation)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border-2 border-purple-200 transition-all duration-200"
          >
            <span className="text-base font-semibold text-gray-800 flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-purple-600" />
              Click here to see the Gradation Table
            </span>
            {showGradation ? (
              <ChevronUp className="w-5 h-5 text-purple-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-purple-600" />
            )}
          </button>

          {showGradation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-6 bg-white rounded-lg border-2 border-purple-200"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">PET Scoring Criteria</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1600m Run Table */}
                <div>
                  <h5 className="font-semibold text-blue-700 mb-3 text-center">1600 Meters Run</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-300">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="border border-gray-300 px-2 py-2">Time</th>
                          <th className="border border-gray-300 px-2 py-2">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 4:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">40</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">4:01-4:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">36</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">4:31-5:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">32</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">5:01-5:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">28</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">5:31-6:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">25</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">6:01-6:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">22</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">6:31-7:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">19</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">7:01-7:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">17</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">7:31-8:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">15</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">8:01-8:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">13</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">8:31-9:00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">11</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">9:01-9:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">10</td></tr>
                        <tr className="bg-red-50"><td className="border border-gray-300 px-2 py-1 text-center text-red-600">&gt; 9:30</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold text-red-600">DQ</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 100m Run Table */}
                <div>
                  <h5 className="font-semibold text-green-700 mb-3 text-center">100 Meters Run</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-300">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="border border-gray-300 px-2 py-2">Time (sec)</th>
                          <th className="border border-gray-300 px-2 py-2">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 10.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">30</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 11.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">27</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 11.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">24</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 12.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">21</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 12.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">19</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 13.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">17</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 13.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">15</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 14.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">13</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 14.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">11</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 15.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">10</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 15.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">9</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≤ 16.00</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">8</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≤ 16.50</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">7</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Long Jump Table */}
                <div>
                  <h5 className="font-semibold text-purple-700 mb-3 text-center">Long Jump</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-300">
                      <thead className="bg-purple-100">
                        <tr>
                          <th className="border border-gray-300 px-2 py-2">Distance (m)</th>
                          <th className="border border-gray-300 px-2 py-2">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 5.61</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">30</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≥ 5.41</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">27</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 5.21</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">24</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≥ 5.01</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">21</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 4.81</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">19</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≥ 4.61</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">17</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 4.41</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">15</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≥ 4.21</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">13</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 4.01</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">11</td></tr>
                        <tr className="bg-gray-50"><td className="border border-gray-300 px-2 py-1 text-center">≥ 3.80</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">10</td></tr>
                        <tr><td className="border border-gray-300 px-2 py-1 text-center">≥ 3.65</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold">9</td></tr>
                        <tr className="bg-red-50"><td className="border border-gray-300 px-2 py-1 text-center text-red-600">&lt; 3.65</td><td className="border border-gray-300 px-2 py-1 text-center font-semibold text-red-600">0</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-xs text-gray-700 text-center">
                  <strong>Note:</strong> Maximum marks: 1600m = 40, 100m = 30, Long Jump = 30. Total = 100 marks
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 1600m Run Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              1600 Meters Run (Time)
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="15"
                  placeholder="Min"
                  value={minutes1600}
                  onChange={(e) => setMinutes1600(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-xs text-gray-500 mt-1 block">Minutes</span>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="Sec"
                  value={seconds1600}
                  onChange={(e) => setSeconds1600(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-xs text-gray-500 mt-1 block">Seconds</span>
              </div>
            </div>
          </div>

          {/* 100m Run Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              100 Meters Run (Seconds)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 14.50"
              value={seconds100}
              onChange={(e) => setSeconds100(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500 mt-1 block">Enter in seconds (e.g., 14.50)</span>
          </div>

          {/* Long Jump Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Long Jump (Meters)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 4.25"
              value={longJump}
              onChange={(e) => setLongJump(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-xs text-gray-500 mt-1 block">Enter in meters (e.g., 4.25)</span>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleCalculate}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Score
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
          >
            Reset
          </Button>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl p-6 border-2 ${
              result.isImpossible || result.isDisqualified 
                ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            }`}
          >
            {result.isImpossible ? (
              // Show funny message for impossible timing
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="w-12 h-12 text-orange-500 mr-3" />
                  <h4 className="text-2xl font-bold text-gray-900">Impossible Timing! 😄</h4>
                </div>
                <div className="bg-white rounded-lg p-6 mb-4">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {result.impossibleMessage}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  The world record for 1600m is around 3:43. Please enter a realistic time to calculate your score.
                </p>
              </div>
            ) : result.isDisqualified ? (
              // Show disqualification message
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mr-3" />
                  <h4 className="text-2xl font-bold text-gray-900">Qualification Status</h4>
                </div>
                <div className="bg-white rounded-lg p-6 border-2 border-red-300">
                  <p className="text-lg text-red-700 font-semibold leading-relaxed">
                    {result.disqualificationReason}
                  </p>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> The 1600m run is mandatory. You must complete it within 9 minutes 30 seconds to be eligible for consideration. 
                    Focus on improving your endurance and try again!
                  </p>
                </div>
              </div>
            ) : (
              // Show normal score result
              <>
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
                  <h4 className="text-2xl font-bold text-gray-900">Your PET Score</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">1600m Run</p>
                    <p className="text-3xl font-bold text-blue-600">{result.run1600Score}</p>
                    <p className="text-xs text-gray-500">/ 40 marks</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">100m Run</p>
                    <p className="text-3xl font-bold text-green-600">{result.run100Score}</p>
                    <p className="text-xs text-gray-500">/ 30 marks</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Long Jump</p>
                    <p className="text-3xl font-bold text-purple-600">{result.longJumpScore}</p>
                    <p className="text-xs text-gray-500">/ 30 marks</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg p-4 text-center border-2 border-yellow-400">
                    <p className="text-sm text-gray-700 mb-1 font-semibold">Total Score</p>
                    <p className="text-4xl font-bold text-yellow-700">{result.totalScore}</p>
                    <p className="text-xs text-gray-600">/ 100 marks</p>
                  </div>
                </div>

                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    {result.totalScore >= 70 ? (
                      <span className="text-green-600 font-semibold">🎉 Excellent Performance! Great score for APSP/AR positions.</span>
                    ) : result.totalScore >= 50 ? (
                      <span className="text-blue-600 font-semibold">👍 Good Performance! Keep practicing to improve further.</span>
                    ) : (
                      <span className="text-orange-600 font-semibold">💪 Keep Training! Focus on improving your timings and distance.</span>
                    )}
                  </p>
                </div>

                {/* Share Button */}
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={handleShareScore}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share My Score
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </Card>
    </div>
  );
}

