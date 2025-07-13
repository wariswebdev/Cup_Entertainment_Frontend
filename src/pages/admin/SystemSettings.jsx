import React, { useState } from "react";
import {
  Settings,
  Save,
  Eye,
  EyeOff,
  Globe,
  Shield,
  Mail,
  Bell,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import ChangePassword from "../../components/auth/ChangePassword";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Cup Entertainment",
    siteDescription: "Premium entertainment streaming platform",
    siteUrl: "https://cupentertainment.com",
    adminEmail: "admin@cupentertainment.com",
    timezone: "UTC",
    language: "en",

    // Security Settings
    enableTwoFactor: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    enableLoginAttempts: true,
    maxLoginAttempts: 5,

    // Email Settings
    smtpHost: "smtp.example.com",
    smtpPort: 587,
    smtpUsername: "noreply@cupentertainment.com",
    smtpPassword: "••••••••",
    enableEmailNotifications: true,

    // Storage Settings
    storageProvider: "aws",
    maxFileSize: 5000,
    allowedFileTypes: "mp4,avi,mkv,mov",
    enableCloudStorage: true,

    // Streaming Settings
    defaultQuality: "1080p",
    enableAdaptiveStreaming: true,
    enableSubtitles: true,
    enableDownloads: false,

    // Notification Settings
    enablePushNotifications: true,
    enableEmailDigest: true,
    enableSMSNotifications: false,
  });

  const [activeTab, setActiveTab] = useState("general");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "email", label: "Email", icon: Mail },
    { id: "storage", label: "Storage", icon: Globe },
    { id: "streaming", label: "Streaming", icon: Eye },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const timezoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "Eastern Time" },
    { value: "America/Los_Angeles", label: "Pacific Time" },
    { value: "Europe/London", label: "London" },
    { value: "Asia/Tokyo", label: "Tokyo" },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
  ];

  const storageProviderOptions = [
    { value: "aws", label: "Amazon S3" },
    { value: "gcp", label: "Google Cloud Storage" },
    { value: "azure", label: "Azure Blob Storage" },
    { value: "local", label: "Local Storage" },
  ];

  const qualityOptions = [
    { value: "480p", label: "480p" },
    { value: "720p", label: "720p" },
    { value: "1080p", label: "1080p" },
    { value: "4k", label: "4K" },
  ];

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Saving settings:", settings);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Name
          </label>
          <Input
            value={settings.siteName}
            onChange={(e) => handleSettingChange("siteName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Email
          </label>
          <Input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site Description
        </label>
        <textarea
          rows={3}
          value={settings.siteDescription}
          onChange={(e) =>
            handleSettingChange("siteDescription", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#af3494]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site URL
          </label>
          <Input
            value={settings.siteUrl}
            onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <Select
            options={timezoneOptions}
            value={settings.timezone}
            onChange={(e) => handleSettingChange("timezone", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Default Language
        </label>
        <Select
          options={languageOptions}
          value={settings.language}
          onChange={(e) => handleSettingChange("language", e.target.value)}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleSettingChange("sessionTimeout", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Expiry (days)
          </label>
          <Input
            type="number"
            value={settings.passwordExpiry}
            onChange={(e) =>
              handleSettingChange("passwordExpiry", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Require 2FA for all admin accounts
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableTwoFactor}
              onChange={(e) =>
                handleSettingChange("enableTwoFactor", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableTwoFactor ? "bg-[#af3494]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableTwoFactor ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Login Attempt Limits
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Limit failed login attempts
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableLoginAttempts}
              onChange={(e) =>
                handleSettingChange("enableLoginAttempts", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableLoginAttempts ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableLoginAttempts
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        {settings.enableLoginAttempts && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Login Attempts
            </label>
            <Input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) =>
                handleSettingChange(
                  "maxLoginAttempts",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
        )}
      </div>

      {/* Change Password Section */}
      <div className="mt-8">
        <ChangePassword />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Host
          </label>
          <Input
            value={settings.smtpHost}
            onChange={(e) => handleSettingChange("smtpHost", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Port
          </label>
          <Input
            type="number"
            value={settings.smtpPort}
            onChange={(e) =>
              handleSettingChange("smtpPort", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Username
          </label>
          <Input
            value={settings.smtpUsername}
            onChange={(e) =>
              handleSettingChange("smtpUsername", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SMTP Password
          </label>
          <div className="relative">
            <Input
              type={showPasswordFields ? "text" : "password"}
              value={settings.smtpPassword}
              onChange={(e) =>
                handleSettingChange("smtpPassword", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPasswordFields ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900">Email Notifications</h3>
          <p className="text-sm text-gray-600">
            Send system notifications via email
          </p>
        </div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={settings.enableEmailNotifications}
            onChange={(e) =>
              handleSettingChange("enableEmailNotifications", e.target.checked)
            }
          />
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.enableEmailNotifications
                ? "bg-purple-600"
                : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.enableEmailNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );

  const renderStorageSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Storage Provider
        </label>
        <Select
          options={storageProviderOptions}
          value={settings.storageProvider}
          onChange={(e) =>
            handleSettingChange("storageProvider", e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max File Size (MB)
          </label>
          <Input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) =>
              handleSettingChange("maxFileSize", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allowed File Types
          </label>
          <Input
            value={settings.allowedFileTypes}
            onChange={(e) =>
              handleSettingChange("allowedFileTypes", e.target.value)
            }
            placeholder="mp4,avi,mkv,mov"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900">Cloud Storage</h3>
          <p className="text-sm text-gray-600">
            Enable cloud storage for media files
          </p>
        </div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={settings.enableCloudStorage}
            onChange={(e) =>
              handleSettingChange("enableCloudStorage", e.target.checked)
            }
          />
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.enableCloudStorage ? "bg-purple-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.enableCloudStorage ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </label>
      </div>
    </div>
  );

  const renderStreamingSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Default Video Quality
        </label>
        <Select
          options={qualityOptions}
          value={settings.defaultQuality}
          onChange={(e) =>
            handleSettingChange("defaultQuality", e.target.value)
          }
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Adaptive Streaming</h3>
            <p className="text-sm text-gray-600">
              Automatically adjust quality based on connection
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableAdaptiveStreaming}
              onChange={(e) =>
                handleSettingChange("enableAdaptiveStreaming", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableAdaptiveStreaming
                  ? "bg-purple-600"
                  : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableAdaptiveStreaming
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Subtitles Support</h3>
            <p className="text-sm text-gray-600">
              Enable subtitle tracks for videos
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableSubtitles}
              onChange={(e) =>
                handleSettingChange("enableSubtitles", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableSubtitles ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableSubtitles ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Download Feature</h3>
            <p className="text-sm text-gray-600">
              Allow users to download content for offline viewing
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableDownloads}
              onChange={(e) =>
                handleSettingChange("enableDownloads", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableDownloads ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableDownloads ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Push Notifications</h3>
            <p className="text-sm text-gray-600">
              Send push notifications to mobile apps
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enablePushNotifications}
              onChange={(e) =>
                handleSettingChange("enablePushNotifications", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enablePushNotifications
                  ? "bg-purple-600"
                  : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enablePushNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Email Digest</h3>
            <p className="text-sm text-gray-600">
              Send weekly email digest to users
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableEmailDigest}
              onChange={(e) =>
                handleSettingChange("enableEmailDigest", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableEmailDigest ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableEmailDigest ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">SMS Notifications</h3>
            <p className="text-sm text-gray-600">
              Send SMS notifications for important updates
            </p>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="sr-only"
              checked={settings.enableSMSNotifications}
              onChange={(e) =>
                handleSettingChange("enableSMSNotifications", e.target.checked)
              }
            />
            <div
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableSMSNotifications
                  ? "bg-purple-600"
                  : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableSMSNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "email":
        return renderEmailSettings();
      case "storage":
        return renderStorageSettings();
      case "streaming":
        return renderStreamingSettings();
      case "notifications":
        return renderNotificationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            System & Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure system-wide settings and preferences.
          </p>
        </div>
        <Button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64">
          <Card>
            <Card.Content className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-50 text-purple-700 border-r-2 border-purple-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card.Content>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card>
            <Card.Header>
              <Card.Title>
                {tabs.find((tab) => tab.id === activeTab)?.label} Settings
              </Card.Title>
            </Card.Header>
            <Card.Content>{renderTabContent()}</Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
