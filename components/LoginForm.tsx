import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight, Lock, Mail, ShieldCheck, Loader2, User, ArrowLeft, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { AuthStatus, AuthView } from '../types';

const LoginForm: React.FC = () => {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (view === 'REGISTER') {
      const pass = formData.password;
      let score = 0;
      if (!pass) {
        setPasswordStrength(0);
        return;
      }

      // Length check
      if (pass.length > 5) score += 10;
      if (pass.length >= 8) score += 15;
      if (pass.length >= 12) score += 10;
      
      // Complexity checks
      if (/[A-Z]/.test(pass)) score += 15;
      if (/[a-z]/.test(pass)) score += 15;
      if (/[0-9]/.test(pass)) score += 15;
      if (/[^A-Za-z0-9]/.test(pass)) score += 20;

      setPasswordStrength(Math.min(100, score));
    }
  }, [formData.password, view]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Detailed Validation Logic
    if (!formData.email) {
      setErrorMessage('Email address is required. Please enter your corporate email.');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrorMessage('The email format is invalid. Please check for typos (e.g., name@company.com).');
      return;
    }

    if (view === 'LOGIN') {
      if (!formData.password) {
        setErrorMessage('Password is required to sign in. Please enter your credentials.');
        return;
      }
    } else if (view === 'REGISTER') {
      if (!formData.name) {
        setErrorMessage('Full name is required. Please provide your name for the account profile.');
        return;
      }
      if (formData.name.trim().length < 2) {
        setErrorMessage('Name is too short. Please enter your full name.');
        return;
      }
      
      if (!formData.password) {
        setErrorMessage('Password is required to create an account.');
        return;
      }

      if (passwordStrength < 40) {
        setErrorMessage('Your password is too weak. Please use at least 8 characters, mixing letters and numbers.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match. Please re-type your password in the confirmation field.');
        return;
      }
    }

    setStatus(AuthStatus.LOADING);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (view === 'LOGIN') {
      setStatus(AuthStatus.SUCCESS);
    } else if (view === 'REGISTER') {
      setStatus(AuthStatus.IDLE);
      setSuccessMessage('Account created successfully. A verification email has been sent.');
      setView('LOGIN');
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } else if (view === 'FORGOT_PASSWORD') {
      setStatus(AuthStatus.IDLE);
      setSuccessMessage('Password reset instructions have been sent to your email address.');
      setView('LOGIN');
    }
  };

  const switchView = (newView: AuthView) => {
    setView(newView);
    setErrorMessage('');
    setSuccessMessage('');
    setStatus(AuthStatus.IDLE);
    setPasswordStrength(0);
  };

  if (status === AuthStatus.SUCCESS) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <ShieldCheck className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Authenticated</h2>
        <p className="text-slate-400 text-sm">Redirecting to secure dashboard...</p>
      </div>
    );
  }

  // Common input classes for consistency
  const inputClasses = "block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 hover:border-slate-600 hover:bg-slate-900/70 transition-all duration-300 sm:text-sm backdrop-blur-sm shadow-inner focus:shadow-[0_0_20px_rgba(14,165,233,0.15)]";
  const inputWrapperClasses = "relative transform transition-all duration-300 ease-out group-focus-within:-translate-y-1 group-focus-within:scale-[1.01]";

  const getStrengthLabel = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthTextColor = () => {
    if (passwordStrength < 40) return 'text-red-400';
    if (passwordStrength < 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header for current view */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          {view === 'LOGIN' && 'Sign in to Dashboard'}
          {view === 'REGISTER' && 'Create Internal Account'}
          {view === 'FORGOT_PASSWORD' && 'Reset Password'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {view === 'LOGIN' && 'Enter your credentials to access the system.'}
          {view === 'REGISTER' && 'Register for Nexus Financial access.'}
          {view === 'FORGOT_PASSWORD' && 'We will send a recovery link to your email.'}
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-green-200">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
             <p className="text-sm text-red-200 font-medium">Authentication Error</p>
             <p className="text-xs text-red-300 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {view === 'REGISTER' && (
          <div className="group">
            <label htmlFor="name" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-brand-400">
              Full Name
            </label>
            <div className={inputWrapperClasses}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors duration-300" />
              </div>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={inputClasses}
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        <div className="group">
          <label htmlFor="email" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-brand-400">
            Corporate Email
          </label>
          <div className={inputWrapperClasses}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors duration-300" />
            </div>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={inputClasses}
              placeholder="user@nexus-finance.com"
            />
          </div>
        </div>

        {view !== 'FORGOT_PASSWORD' && (
          <div className="group">
            <label htmlFor="password" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-brand-400">
              Password
            </label>
            <div className={inputWrapperClasses}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors duration-300" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`${inputClasses} pr-12`}
                placeholder={view === 'REGISTER' ? "Create a strong password" : "••••••••••••"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors duration-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {/* Password Strength Meter for Registration */}
            {view === 'REGISTER' && formData.password && (
              <div className="mt-3 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
                <div className="flex justify-between items-center mb-1.5">
                   <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Strength</span>
                   <span className={`text-[10px] font-bold uppercase tracking-wider ${getStrengthTextColor()}`}>
                     {getStrengthLabel()}
                   </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className={`h-full transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.3)] ${getStrengthColor()}`}
                    style={{ width: `${Math.max(5, passwordStrength)}%` }}
                  />
                </div>
                {passwordStrength < 100 && (
                   <div className="flex items-start gap-1.5 mt-2">
                     <Info className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                     <p className="text-[10px] text-slate-500 leading-tight">
                       Tip: Use at least 8 characters, including uppercase letters, numbers, and symbols.
                     </p>
                   </div>
                )}
              </div>
            )}
          </div>
        )}

        {view === 'REGISTER' && (
          <div className="group">
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-brand-400">
              Confirm Password
            </label>
            <div className={inputWrapperClasses}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors duration-300" />
              </div>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`${inputClasses} pr-12`}
                placeholder="Repeat password"
              />
            </div>
          </div>
        )}

        {view === 'LOGIN' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-500/50 focus:ring-offset-0 focus:ring-offset-slate-900 transition-all duration-200"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 hover:text-slate-300 cursor-pointer select-none transition-colors">
                Remember device
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                onClick={() => switchView('FORGOT_PASSWORD')}
                className="font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === AuthStatus.LOADING}
          className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-br from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_-5px_rgba(14,165,233,0.5)] hover:shadow-[0_8px_25px_-5px_rgba(14,165,233,0.6)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {status === AuthStatus.LOADING ? (
               <Loader2 className="h-5 w-5 text-brand-200 animate-spin" />
            ) : (
               <div className="w-5" />
            )}
          </span>
          {status === AuthStatus.LOADING 
            ? 'Processing...' 
            : (view === 'LOGIN' ? 'Sign in to Dashboard' : (view === 'REGISTER' ? 'Create Account' : 'Send Reset Link'))
          }
          <span className="absolute right-0 inset-y-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
            <ArrowRight className="h-5 w-5 text-brand-100" />
          </span>
        </button>

        <div className="flex items-center justify-between mt-6">
           {view === 'LOGIN' ? (
             <div className="w-full text-center">
               <span className="text-slate-500 text-sm">Don't have an account? </span>
               <button 
                 type="button"
                 onClick={() => switchView('REGISTER')}
                 className="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors ml-1"
               >
                 Register Now
               </button>
             </div>
           ) : (
             <button
                type="button"
                onClick={() => switchView('LOGIN')}
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm mx-auto group"
             >
               <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
               Back to Sign In
             </button>
           )}
        </div>
        
        {view === 'LOGIN' && (
          <>
            <div className="relative mt-8 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-950/50 px-2 text-slate-500 backdrop-blur-sm">
                  Or continue with SSO
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2.5 border border-slate-700 rounded-lg shadow-sm bg-slate-900/50 hover:bg-slate-800 focus:ring-2 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-900 transition-all duration-200 backdrop-blur-sm group transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                  <svg className="h-5 w-5 mr-2 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Google</span>
              </button>
              <button
                  type="button"
                  className="flex items-center justify-center px-4 py-2.5 border border-slate-700 rounded-lg shadow-sm bg-slate-900/50 hover:bg-slate-800 focus:ring-2 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-900 transition-all duration-200 backdrop-blur-sm group transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                   <svg className="h-5 w-5 mr-2 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white">Microsoft</span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginForm;