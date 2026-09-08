import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getAdminAppSettings, updateAdminAppSettings } from '../../../services/api/adminAppSettingsService';

// Icons
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const tabs = [
  { id: 'mail', label: 'Mail Setting', icon: <MailIcon /> },
  { id: 'google', label: 'Google API / Recaptcha', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg> },
  { id: 'firebase', label: 'Firebase Setting', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> },
  { id: 'notification', label: 'Notification Setting', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> },
  { id: 'social', label: 'Social Links', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
  { id: 'shiprocket', label: 'Shiprocket Integration', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> },
  { id: 'other', label: 'Other Setting', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> },
];

export default function AdminAppSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'mail');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Form states
  const [mailForm, setMailForm] = useState({
    mailerName: '',
    host: '',
    driver: 'smtp',
    port: '587',
    userName: '',
    emailId: '',
    encryption: 'tls',
    password: '',
  });

  const [googleForm, setGoogleForm] = useState({
    analyticsId: '',
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
    mapApiKey: '',
  });

  const [firebaseForm, setFirebaseForm] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    msgSenderId: '',
    appId: '',
    measurementId: '',
  });

  const [notifForm, setNotifForm] = useState({
    fcmKey: '',
    enablePush: true,
    enableEmail: true,
  });

  const [socialForm, setSocialForm] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  });

  const [shiprocketForm, setShiprocketForm] = useState({
    enabled: true,
    email: '',
    password: '',
    baseUrl: 'https://apiv2.shiprocket.in',
  });

  const [otherForm, setOtherForm] = useState({
    currencySymbol: '₹',
    currencyCode: 'INR',
    timezone: 'IST (India)',
    maintenanceMode: false,
    forceUpdate: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsFetching(true);
      const res = await getAdminAppSettings();
      if (res?.data || res?.success) {
        const data = res.data || res;
        if (data.mailSettings) setMailForm(prev => ({ ...prev, ...data.mailSettings }));
        if (data.googleSettings) setGoogleForm(prev => ({ ...prev, ...data.googleSettings }));
        if (data.firebaseSettings) setFirebaseForm(prev => ({ ...prev, ...data.firebaseSettings }));
        if (data.notificationSettings) setNotifForm(prev => ({ ...prev, ...data.notificationSettings }));
        if (data.socialMediaLinks) setSocialForm(prev => ({ ...prev, ...data.socialMediaLinks }));
        if (data.shiprocketSettings) setShiprocketForm(prev => ({ ...prev, ...data.shiprocketSettings }));
        if (data.otherSettings) setOtherForm(prev => ({ ...prev, ...data.otherSettings }));
      }
    } catch (err) {
      console.error('Error fetching app settings:', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    setActiveTab(tab || 'mail');
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const payload: any = {
        mailSettings: mailForm,
        googleSettings: googleForm,
        firebaseSettings: firebaseForm,
        notificationSettings: notifForm,
        socialMediaLinks: socialForm,
        shiprocketSettings: shiprocketForm,
        otherSettings: otherForm,
      };
      const res = await updateAdminAppSettings(payload);
      if (res?.success !== false) {
        toast.success('Settings updated successfully!');
      } else {
        toast.error(res?.message || 'Failed to update settings');
      }
    } catch (err: any) {
      console.error('Error updating settings:', err);
      toast.error(err?.response?.data?.message || 'Error updating settings');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mail':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Mail Configuration</h3>
              <p className="text-sm text-gray-500 mt-1">Configure SMTP credentials for sending transactional emails.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="Mailer Name"
                value={mailForm.mailerName}
                onChange={e => setMailForm({ ...mailForm, mailerName: e.target.value })}
                placeholder="e.g. SMTP Mailer"
              />
              <InputGroup
                label="Host (e.g. smtp.gmail.com)"
                value={mailForm.host}
                onChange={e => setMailForm({ ...mailForm, host: e.target.value })}
                placeholder="smtp.gmail.com"
              />
              <InputGroup
                label="Driver (e.g. smtp)"
                value={mailForm.driver}
                onChange={e => setMailForm({ ...mailForm, driver: e.target.value })}
                placeholder="smtp"
              />
              <InputGroup
                label="Port (e.g. 587)"
                value={mailForm.port}
                onChange={e => setMailForm({ ...mailForm, port: e.target.value })}
                placeholder="587"
              />
              <InputGroup
                label="Username"
                value={mailForm.userName}
                onChange={e => setMailForm({ ...mailForm, userName: e.target.value })}
                placeholder="smtp_username"
              />
              <InputGroup
                label="Email ID"
                type="email"
                value={mailForm.emailId}
                onChange={e => setMailForm({ ...mailForm, emailId: e.target.value })}
                placeholder="info@example.com"
              />
              <InputGroup
                label="Encryption (e.g. tls)"
                value={mailForm.encryption}
                onChange={e => setMailForm({ ...mailForm, encryption: e.target.value })}
                placeholder="tls"
              />
              <InputGroup
                label="Password"
                type="password"
                value={mailForm.password}
                onChange={e => setMailForm({ ...mailForm, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
        );

      case 'google':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Google API & Recaptcha</h3>
              <p className="text-sm text-gray-500 mt-1">Configure Google Analytics, Maps, and reCAPTCHA keys.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="Google Analytics ID"
                value={googleForm.analyticsId}
                onChange={e => setGoogleForm({ ...googleForm, analyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX or UA-XXXXX-Y"
              />
              <InputGroup
                label="Recaptcha Site Key"
                value={googleForm.recaptchaSiteKey}
                onChange={e => setGoogleForm({ ...googleForm, recaptchaSiteKey: e.target.value })}
                placeholder="Enter Recaptcha Site Key"
              />
              <InputGroup
                label="Recaptcha Secret Key"
                type="password"
                value={googleForm.recaptchaSecretKey}
                onChange={e => setGoogleForm({ ...googleForm, recaptchaSecretKey: e.target.value })}
                placeholder="Enter Recaptcha Secret Key"
              />
              <InputGroup
                label="Google Map API Key"
                value={googleForm.mapApiKey}
                onChange={e => setGoogleForm({ ...googleForm, mapApiKey: e.target.value })}
                placeholder="Enter Google Maps API Key"
              />
            </div>
          </div>
        );

      case 'firebase':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Firebase Configuration</h3>
              <p className="text-sm text-gray-500 mt-1">Configure Firebase Web SDK credentials for auth and cloud features.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="API Key"
                value={firebaseForm.apiKey}
                onChange={e => setFirebaseForm({ ...firebaseForm, apiKey: e.target.value })}
                placeholder="AIzaSy..."
              />
              <InputGroup
                label="Auth Domain"
                value={firebaseForm.authDomain}
                onChange={e => setFirebaseForm({ ...firebaseForm, authDomain: e.target.value })}
                placeholder="app-id.firebaseapp.com"
              />
              <InputGroup
                label="Project ID"
                value={firebaseForm.projectId}
                onChange={e => setFirebaseForm({ ...firebaseForm, projectId: e.target.value })}
                placeholder="project-id"
              />
              <InputGroup
                label="Storage Bucket"
                value={firebaseForm.storageBucket}
                onChange={e => setFirebaseForm({ ...firebaseForm, storageBucket: e.target.value })}
                placeholder="project-id.appspot.com"
              />
              <InputGroup
                label="Messaging Sender ID"
                value={firebaseForm.msgSenderId}
                onChange={e => setFirebaseForm({ ...firebaseForm, msgSenderId: e.target.value })}
                placeholder="123456789"
              />
              <InputGroup
                label="App ID"
                value={firebaseForm.appId}
                onChange={e => setFirebaseForm({ ...firebaseForm, appId: e.target.value })}
                placeholder="1:123456789:web:abcdef"
              />
              <div className="md:col-span-2">
                <InputGroup
                  label="Measurement ID"
                  value={firebaseForm.measurementId}
                  onChange={e => setFirebaseForm({ ...firebaseForm, measurementId: e.target.value })}
                  placeholder="G-XXXXXX"
                />
              </div>
            </div>
          </div>
        );

      case 'notification':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Notification Settings</h3>
              <p className="text-sm text-gray-500 mt-1">Control automated notifications and cloud messaging credentials.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="FCM Server Key"
                type="password"
                value={notifForm.fcmKey}
                onChange={e => setNotifForm({ ...notifForm, fcmKey: e.target.value })}
                placeholder="Enter Firebase Cloud Messaging Server Key"
              />
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <span className="font-medium text-gray-800">Enable Push Notifications</span>
                  <p className="text-xs text-gray-500 mt-0.5">Send push notifications for order status and offers</p>
                </div>
                <ToggleSwitch
                  checked={notifForm.enablePush}
                  onChange={() => setNotifForm({ ...notifForm, enablePush: !notifForm.enablePush })}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <span className="font-medium text-gray-800">Enable Email Notifications</span>
                  <p className="text-xs text-gray-500 mt-0.5">Send automated email updates for transactions and accounts</p>
                </div>
                <ToggleSwitch
                  checked={notifForm.enableEmail}
                  onChange={() => setNotifForm({ ...notifForm, enableEmail: !notifForm.enableEmail })}
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Social Media Links</h3>
              <p className="text-sm text-gray-500 mt-1">Links displayed across customer footer and contact sections.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="Facebook URL"
                value={socialForm.facebook}
                onChange={e => setSocialForm({ ...socialForm, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
              />
              <InputGroup
                label="Twitter / X URL"
                value={socialForm.twitter}
                onChange={e => setSocialForm({ ...socialForm, twitter: e.target.value })}
                placeholder="https://twitter.com/..."
              />
              <InputGroup
                label="Instagram URL"
                value={socialForm.instagram}
                onChange={e => setSocialForm({ ...socialForm, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
              />
              <InputGroup
                label="LinkedIn URL"
                value={socialForm.linkedin}
                onChange={e => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
              <InputGroup
                label="YouTube URL"
                value={socialForm.youtube}
                onChange={e => setSocialForm({ ...socialForm, youtube: e.target.value })}
                placeholder="https://youtube.com/@..."
              />
            </div>
          </div>
        );

      case 'shiprocket':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--primary-alpha-10)] text-[var(--primary-dark)] rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Shiprocket Configuration</h3>
                <p className="text-sm text-gray-500">Manage your shipping API credentials and automated courier settings</p>
              </div>
            </div>

            <div className="bg-gray-50/70 rounded-2xl border border-gray-100 p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80">
                <div>
                  <h4 className="font-bold text-gray-800 text-base">Shiprocket Integration Status</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Enable or disable automated Shiprocket courier sync</p>
                </div>
                <ToggleSwitch
                  checked={shiprocketForm.enabled}
                  onChange={() => setShiprocketForm({ ...shiprocketForm, enabled: !shiprocketForm.enabled })}
                />
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Account Email</label>
                  <input
                    type="email"
                    value={shiprocketForm.email}
                    onChange={e => setShiprocketForm({ ...shiprocketForm, email: e.target.value })}
                    placeholder="Enter your Shiprocket account email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Account Password</label>
                  <input
                    type="password"
                    value={shiprocketForm.password}
                    onChange={e => setShiprocketForm({ ...shiprocketForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Base API URL</label>
                  <input
                    type="text"
                    value={shiprocketForm.baseUrl}
                    onChange={e => setShiprocketForm({ ...shiprocketForm, baseUrl: e.target.value })}
                    placeholder="https://apiv2.shiprocket.in"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="px-8 py-3 bg-[var(--primary-dark,#047857)] text-white font-bold rounded-xl hover:bg-[var(--primary-darker,#065f46)] shadow-md active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'other':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Other Settings</h3>
              <p className="text-sm text-gray-500 mt-1">General system configurations and maintenance controls.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              <InputGroup
                label="Currency Symbol"
                value={otherForm.currencySymbol}
                onChange={e => setOtherForm({ ...otherForm, currencySymbol: e.target.value })}
                placeholder="₹"
              />
              <InputGroup
                label="Currency Code"
                value={otherForm.currencyCode}
                onChange={e => setOtherForm({ ...otherForm, currencyCode: e.target.value })}
                placeholder="INR"
              />
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <select
                  value={otherForm.timezone}
                  onChange={e => setOtherForm({ ...otherForm, timezone: e.target.value })}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)]/20 p-3 border bg-white"
                >
                  <option value="IST (India)">IST (India) - GMT+5:30</option>
                  <option value="UTC">UTC - GMT+0:00</option>
                  <option value="EST (US)">EST (US) - GMT-5:00</option>
                  <option value="PST (US)">PST (US) - GMT-8:00</option>
                  <option value="GST (Dubai)">GST (Dubai) - GMT+4:00</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <ToggleItem
                  label="Maintenance Mode"
                  description="Temporarily disable customer access for scheduled maintenance"
                  checked={otherForm.maintenanceMode}
                  onChange={() => setOtherForm({ ...otherForm, maintenanceMode: !otherForm.maintenanceMode })}
                />
              </div>
              <div className="md:col-span-2">
                <ToggleItem
                  label="Force Update App"
                  description="Require mobile application users to update to the latest release"
                  checked={otherForm.forceUpdate}
                  onChange={() => setOtherForm({ ...otherForm, forceUpdate: !otherForm.forceUpdate })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a setting</div>;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">App Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">Manage integrations, API keys, notifications, and application preferences</p>
        </div>
        {activeTab !== 'shiprocket' && (
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl text-white font-semibold shadow-md bg-[var(--primary-dark,#047857)] hover:bg-[var(--primary-darker,#065f46)] hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50 flex items-center gap-2 self-start md:self-auto"
          >
            {isLoading ? 'Updating...' : 'Save Changes'}
          </button>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Tabs Nav */}
        <nav className="w-full lg:w-72 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 space-y-1.5">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Settings Menu
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-150 text-left ${
                activeTab === tab.id
                  ? 'bg-[var(--primary-alpha-10)] text-[var(--primary-darker,#065f46)] shadow-sm font-bold border-l-4 border-[var(--primary-dark,#047857)]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
              }`}
            >
              <span className={`flex-shrink-0 ${activeTab === tab.id ? 'text-[var(--primary-dark)]' : 'text-gray-400'}`}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Content Card */}
        <div className="flex-1 w-full min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 min-h-[500px]">
          {isFetching ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary-dark)]"></div>
              <span className="text-sm">Loading configurations...</span>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function InputGroup({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)] transition-all text-sm"
        autoComplete="off"
      />
    </div>
  );
}

function ToggleItem({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div>
        <span className="font-semibold text-gray-800 text-sm">{label}</span>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-[var(--primary-dark,#047857)]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
