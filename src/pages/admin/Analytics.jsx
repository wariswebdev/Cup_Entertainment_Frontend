import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Play,
  Calendar,
  Download,
  Eye,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("last30days");
  const [selectedMetric, setSelectedMetric] = useState("views");

  const dateRangeOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "last90days", label: "Last 90 Days" },
    { value: "custom", label: "Custom Range" },
  ];

  const metricOptions = [
    { value: "views", label: "Views" },
    { value: "users", label: "Users" },
    { value: "engagement", label: "Engagement" },
    { value: "revenue", label: "Revenue" },
  ];

  const overviewStats = [
    {
      title: "Total Views",
      value: "2.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "45.2K",
      change: "+8.3%",
      changeType: "positive",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Watch Time",
      value: "1.2M hrs",
      change: "+15.7%",
      changeType: "positive",
      icon: Play,
      color: "text-[#af3494]",
    },
    {
      title: "Revenue",
      value: "$12.4K",
      change: "-2.1%",
      changeType: "negative",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const topContent = [
    {
      title: "Avengers: Endgame",
      type: "Movie",
      views: "145K",
      engagement: "92%",
      revenue: "$2.1K",
    },
    {
      title: "Breaking Bad S1E1",
      type: "TV Show",
      views: "98K",
      engagement: "89%",
      revenue: "$1.8K",
    },
    {
      title: "The Dark Knight",
      type: "Movie",
      views: "87K",
      engagement: "91%",
      revenue: "$1.6K",
    },
    {
      title: "Stranger Things S4E1",
      type: "TV Show",
      views: "76K",
      engagement: "88%",
      revenue: "$1.4K",
    },
  ];

  const audienceData = [
    { country: "United States", users: "15.2K", percentage: 35 },
    { country: "United Kingdom", users: "8.7K", percentage: 20 },
    { country: "Canada", users: "6.1K", percentage: 14 },
    { country: "Australia", users: "4.3K", percentage: 10 },
    { country: "Germany", users: "3.8K", percentage: 9 },
    { country: "Others", users: "5.1K", percentage: 12 },
  ];

  const deviceData = [
    { device: "Mobile", users: "18.5K", percentage: 42 },
    { device: "Desktop", users: "14.8K", percentage: 34 },
    { device: "Tablet", users: "7.2K", percentage: 16 },
    { device: "Smart TV", users: "3.5K", percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track performance, audience insights, and revenue metrics.
          </p>
        </div>
        <div className="flex space-x-3">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <Card.Content>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-sm ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      vs last period
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Views Over Time</Card.Title>
              <Select
                options={metricOptions}
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              />
            </div>
          </Card.Header>
          <Card.Content>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive chart would go here</p>
                <p className="text-sm text-gray-400 mt-1">
                  Showing {selectedMetric} for {dateRange}
                </p>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Revenue Breakdown */}
        <Card>
          <Card.Header>
            <Card.Title>Revenue Breakdown</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Subscription Revenue</span>
                <span className="text-lg font-bold text-blue-600">$8.2K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Ad Revenue</span>
                <span className="text-lg font-bold text-green-600">$3.1K</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#af3494]/10 rounded-lg">
                <span className="font-medium">Pay-per-View</span>
                <span className="text-lg font-bold text-[#af3494]">$1.1K</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total Revenue
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    $12.4K
                  </span>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <Card.Header>
          <Card.Title>Top Performing Content</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Content
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Views
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Engagement
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topContent.map((content, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {content.title}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          content.type === "Movie"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {content.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{content.views}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: content.engagement }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {content.engagement}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">
                      {content.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card>
          <Card.Header>
            <Card.Title>Audience by Country</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {audienceData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-6 bg-gray-200 rounded"></div>
                    <span className="font-medium text-gray-900">
                      {country.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {country.users}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Device Distribution */}
        <Card>
          <Card.Header>
            <Card.Title>Audience by Device</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {device.device === "Mobile" && "📱"}
                      {device.device === "Desktop" && "💻"}
                      {device.device === "Tablet" && "📲"}
                      {device.device === "Smart TV" && "📺"}
                    </div>
                    <span className="font-medium text-gray-900">
                      {device.device}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#af3494] h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12">
                      {device.users}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card>
        <Card.Header>
          <Card.Title>Real-time Activity</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                1,234
              </div>
              <div className="text-sm text-gray-600">Users Online</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">567</div>
              <div className="text-sm text-gray-600">Currently Watching</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#af3494] mb-1">89</div>
              <div className="text-sm text-gray-600">New Signups Today</div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Analytics;
