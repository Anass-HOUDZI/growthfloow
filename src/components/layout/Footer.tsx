
import React from "react";
import { Linkedin, Wifi } from "lucide-react";

export const Footer = () => (
  <footer className="w-full py-6 px-4 border-t bg-white/90 backdrop-blur-sm text-sm text-gray-600 mt-12">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
      {/* Copyright et LinkedIn */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <span className="text-center sm:text-left">
          Copyright © 2025 Anass Houdzi – Tous droits réservés.
        </span>
        <a
          href="https://www.linkedin.com/in/anasshoudzi/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors group"
        >
          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="font-medium">LinkedIn</span>
        </a>
      </div>

      {/* Statut de connexion */}
      <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
        <Wifi className="w-4 h-4" />
        <span className="font-medium">En ligne : Vitesse : 10.0 Mbps</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
    </div>
  </footer>
);
