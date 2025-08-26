import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingState } from '../components/ui/loading-state';
import { ErrorFallback } from '../components/ui/ErrorFallback';
import { Mail, MessageCircle, Linkedin, Send, MapPin, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { sanitizeInput, validateEmailConfig } from '../utils/security';
import emailjs from '@emailjs/browser';

// Lazy load components
const AppLayoutGlobal = lazy(() => import('../components/layout/AppLayoutGlobal').then(module => ({
  default: module.AppLayoutGlobal
})));
const CardClean = lazy(() => import('../components/ui/card-clean').then(module => ({
  default: module.CardClean
})));
const Button = lazy(() => import('../components/ui/button').then(module => ({
  default: module.Button
})));
const Input = lazy(() => import('../components/ui/input').then(module => ({
  default: module.Input
})));
const Textarea = lazy(() => import('../components/ui/textarea').then(module => ({
  default: module.Textarea
})));

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name, 100),
        email: sanitizeInput(formData.email, 255),
        subject: sanitizeInput(formData.subject, 200),
        message: sanitizeInput(formData.message, 2000),
      };

      const emailConfig = {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      };

      try {
        validateEmailConfig(emailConfig);
      } catch (configError) {
        toast({
          title: "Configuration Error",
          description: "Email service is not properly configured. Please contact the administrator.",
          variant: "destructive"
        });
        return;
      }

      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        to_email: 'anass.houdzi@gmail.com',
        subject: sanitizedData.subject,
        message: sanitizedData.message,
      };

      await emailjs.send(
        emailConfig.serviceId!,
        emailConfig.templateId!,
        templateParams,
        emailConfig.publicKey!
      );

      toast({
        title: "Message envoyé avec succès !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Erreur d'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingState fullScreen text="Chargement de la page Contact..." />}>
        <AppLayoutGlobal onLogoClick={handleLogoClick}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Contactez
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Notre Équipe
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Une question, une suggestion ou besoin d'aide ? 
                Nous sommes là pour vous accompagner dans votre journey growth marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingState text="Chargement du formulaire..." />}>
                    <CardClean className="p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                          Envoyez-nous un message
                        </h2>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                              Nom complet
                            </label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Votre nom"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                              Email
                            </label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="votre.email@exemple.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                            Sujet
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="De quoi souhaitez-vous parler ?"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                            Message
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Décrivez votre demande en détail..."
                            rows={6}
                            required
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                        </Button>
                      </form>
                    </CardClean>
                  </Suspense>
                </ErrorBoundary>
              </div>

              <div className="space-y-6">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingState text="Chargement des informations..." />}>
                    <CardClean className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Contactez Anass Directement
                      </h3>
                      <div className="space-y-4">
                        <a
                          href="https://www.linkedin.com/in/anasshoudzi/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">LinkedIn</div>
                            <div className="text-sm text-slate-600 dark:text-gray-400">Anass Houdzi</div>
                          </div>
                        </a>
                        
                        <a
                          href="mailto:anass.houdzi@gmail.com"
                          className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <Mail className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Email</div>
                            <div className="text-sm text-slate-600 dark:text-gray-400">anass.houdzi@gmail.com</div>
                          </div>
                        </a>
                      </div>
                    </CardClean>

                    <CardClean className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Informations
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-slate-500" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Réponse</div>
                            <div className="text-sm text-slate-600 dark:text-gray-400">24-48h en général</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-slate-500" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white">Fuseau horaire</div>
                            <div className="text-sm text-slate-600 dark:text-gray-400">Europe/Paris (CET)</div>
                          </div>
                        </div>
                      </div>
                    </CardClean>

                    <CardClean className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                        Questions Fréquentes
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white mb-1">
                            Les outils sont-ils vraiment gratuits ?
                          </div>
                          <div className="text-slate-600 dark:text-gray-400">
                            Oui, 100% gratuits et open source, sans limitation.
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white mb-1">
                            Puis-je contribuer au projet ?
                          </div>
                          <div className="text-slate-600 dark:text-gray-400">
                            Absolument ! Le code est open source, contributions bienvenues.
                          </div>
                        </div>
                        
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white mb-1">
                            Support technique ?
                          </div>
                          <div className="text-slate-600 dark:text-gray-400">
                            Contactez-nous pour toute assistance technique.
                          </div>
                        </div>
                      </div>
                    </CardClean>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </AppLayoutGlobal>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Contact;