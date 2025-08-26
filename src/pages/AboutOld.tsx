import React from 'react';
import { AppLayoutGlobal } from '../components/layout/AppLayoutGlobal';
import { useNavigate } from 'react-router-dom';
import { CardClean } from '../components/ui/card-clean';
import { Target, Users, Zap, Shield, Heart, Linkedin } from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppLayoutGlobal onLogoClick={handleLogoClick}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            À propos de 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}GrowthFlow
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            La suite complète d'outils growth marketing nouvelle génération, 
            conçue pour démocratiser l'accès aux meilleures pratiques du marketing digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <CardClean className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Notre Mission</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              Démocratiser l'accès aux outils de growth marketing en proposant une suite complète 
              d'outils professionnels, 100% gratuits et respectueux de la vie privée.
            </p>
          </CardClean>

          <CardClean className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Innovation</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              Nous développons des outils basés sur les dernières recherches en growth marketing 
              et les meilleures pratiques de l'industrie.
            </p>
          </CardClean>

          <CardClean className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Privacy-First</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              Vos données restent sur votre appareil. Aucun tracking, aucune collecte de données personnelles, 
              respect total de votre vie privée.
            </p>
          </CardClean>

          <CardClean className="p-8">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Open Source</h3>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
              Code source ouvert, transparent et contributif. La communauté peut participer 
              à l'amélioration continue de nos outils.
            </p>
          </CardClean>
        </div>

        <CardClean className="p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Créé par Anass Houdzi
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Expert en growth marketing et développeur passionné, Anass a créé cette suite d'outils 
              pour partager son expertise et aider les professionnels du marketing à atteindre leurs objectifs.
            </p>
            <a
              href="https://www.linkedin.com/in/anasshoudzi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>Suivre sur LinkedIn</span>
            </a>
          </div>
        </CardClean>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rejoignez la Communauté</h3>
          </div>
          <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
            Plus de 10 000 professionnels font déjà confiance à nos outils pour optimiser 
            leurs performances marketing. Rejoignez-nous !
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-sm text-slate-600 dark:text-gray-400">Outils disponibles</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-slate-600 dark:text-gray-400">Gratuit et ouvert</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-slate-600 dark:text-gray-400">Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayoutGlobal>
  );
};

export default About;