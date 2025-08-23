'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Users, Trophy, Code, Zap, Sparkles } from 'lucide-react';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('25/8/25');
  const [timeLeft, setTimeLeft] = useState({
    hours: 26,
    minutes: 0,
    seconds: 0
  });
  const [teams, setTeams] = useState([]);
  const [hackathonData, setHackathonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from JSON file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/team-data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        setTeams(data.teams);
        setHackathonData(data.hackathon);
        setTimeLeft({
          hours: data.timer.initialHours,
          minutes: data.timer.initialMinutes,
          seconds: data.timer.initialSeconds
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load hackathon data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Timer logic
  useEffect(() => {
    if (loading) return;

    let endTime = localStorage.getItem("hackathonEndTime");
    if (!endTime) {
      const now = Date.now();
      endTime = now + (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) * 1000;
      localStorage.setItem("hackathonEndTime", endTime);
    } else {
      endTime = parseInt(endTime);
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000));

      setTimeLeft({
        hours: Math.floor(diff / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });

      return diff > 0;
    };

    // Update immediately
    updateTimer();

    const timer = setInterval(() => {
      if (!updateTimer()) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]);

  const filteredTeams = teams.filter(team => team.date === selectedDate.split('/')[0]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading hackathon data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rotate-45 opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-8 bg-pink-400 opacity-40"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Enhanced Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <img 
                src="images/Smart-India-Hackathon-2024.jpg" 
                alt="Smart India Hackathon 2024 Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 mr-3 sm:mr-4 rounded-lg shadow-lg"
              />
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                {hackathonData?.title || 'SIH Internal Hackathon'}
              </h1>
              <img 
                src="/images/wecode.jpg" 
                alt="WeCode Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 mr-3 ml-3 sm:mr-4 rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="flex justify-center items-center mb-4">
            <Sparkles className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-spin" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-200">
              {hackathonData?.subtitle || 'GEHU Bhimtal'}
            </h2>
            <Sparkles className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6 ml-2 animate-spin" />
          </div>
          
          <div className="mt-4 h-1 w-24 sm:w-32 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full shadow-lg"></div>
          <p className="text-blue-200 text-sm sm:text-base mt-3 opacity-90 font-medium">
            {hackathonData?.tagline || 'Innovation • Technology • Excellence'}
          </p>
        </header>

        {/* Enhanced Date Selection */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 w-full max-w-sm">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="text-blue-300 w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <label className="text-white font-semibold text-base sm:text-lg">Select Date</label>
            </div>
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-800/80 text-white border border-gray-600/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-center font-medium"
            >
              {hackathonData?.dates?.map((dateOption) => (
                <option key={dateOption.value} value={dateOption.value}>
                  {dateOption.label}
                </option>
              )) || [
                <option key="25/8/25" value="25/8/25">🗓️ Day 1 - August 25, 2025</option>,
                <option key="26/8/25" value="26/8/25">🗓️ Day 2 - August 26, 2025</option>
              ]}
            </select>
          </div>
        </div>

        {/* Enhanced Timer */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 w-full max-w-2xl">
            <div className="flex items-center justify-center mb-6">
              <Clock className="text-blue-300 w-6 h-6 sm:w-8 sm:h-8 mr-3 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Time Remaining</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-3 sm:p-4 mb-2 shadow-lg transform hover:scale-105 transition-transform duration-200 border border-red-400/30">
                  <span className="text-2xl sm:text-4xl font-bold text-white block">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-blue-200 font-medium text-sm sm:text-base">Hours</span>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-3 sm:p-4 mb-2 shadow-lg transform hover:scale-105 transition-transform duration-200 border border-amber-400/30">
                  <span className="text-2xl sm:text-4xl font-bold text-white block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-blue-200 font-medium text-sm sm:text-base">Minutes</span>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-3 sm:p-4 mb-2 shadow-lg transform hover:scale-105 transition-transform duration-200 border border-emerald-400/30">
                  <span className="text-2xl sm:text-4xl font-bold text-white block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="text-blue-200 font-medium text-sm sm:text-base">Seconds</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-blue-200 text-sm font-medium">Hackathon in Progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Teams Table */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left">
                <Users className="text-white w-6 h-6 mr-0 sm:mr-3 mb-2 sm:mb-0" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Registered Teams - {selectedDate}
                  </h3>
                  <p className="text-blue-100 mt-1 text-sm sm:text-base">
                    {filteredTeams.length} teams registered for this date
                  </p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50 backdrop-blur-sm">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-blue-300 font-semibold text-sm sm:text-base">S.No.</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-blue-300 font-semibold text-sm sm:text-base">Team Name</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-blue-300 font-semibold text-sm sm:text-base">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team, index) => (
                    <tr 
                      key={team.id} 
                      className="border-b border-white/10 hover:bg-white/5 transition-all duration-200 group"
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-medium text-sm sm:text-base">
                        <div className="flex items-center">
                          <span className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2">
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-white font-medium text-sm sm:text-base group-hover:text-blue-200 transition-colors">
                        {team.name}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-emerald-400 to-blue-400 text-white shadow-lg">
                          📅 {team.date}/8/25
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTeams.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">No teams registered for this date</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="text-center mt-8 sm:mt-12 pb-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
            <div className="text-blue-200">
              <p className="text-base sm:text-lg font-medium flex items-center justify-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Best of luck to all participants! 
                <Sparkles className="w-5 h-5 ml-2 text-yellow-400" />
              </p>
              <p className="text-xs sm:text-sm mt-2 opacity-75">
                May the best team win the SIH Internal Hackathon 2025
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-xs opacity-60">
                <span>🚀 Innovation</span>
                <span>💻 Technology</span>
                <span>🏆 Excellence</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}