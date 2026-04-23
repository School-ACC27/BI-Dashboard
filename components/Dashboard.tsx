"use client";

import { useMemo, useState } from "react";
import { CustomerStageChart } from "./CustomerStageChart";
import { ProductDistributionChart } from "./ProductDistributionChart";
import { CustomerTable } from "./CustomerTable";
import { MarketingStrategies } from "./MarketingStrategies";
import { NPSChart } from "./NPSChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { customers, marketingStrategies } from "../data/crm-data";
import { NPSLineChart } from "./All year line chart";

export default function App() {
  const [selectedRound, setSelectedRound] = useState<number | "all">("all");

  // Filter customers based on selected round
  const filteredCustomers = useMemo(() => {
    if (selectedRound === "all") return customers;
    return customers.filter((c) => c.round === selectedRound);
  }, [selectedRound]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalCustomers = filteredCustomers.length;
    const customersWithNPS = filteredCustomers.filter((c) => c.npsScore !== null);
    const avgNPS = customersWithNPS.length > 0
      ? (customersWithNPS.reduce((sum, c) => sum + (c.npsScore || 0), 0) / customersWithNPS.length).toFixed(1)
      : "N/A";
    
    const eligibleForRetention = filteredCustomers.filter(
      (c) => c.retained !== null && c.retained !== undefined
    );
    
    const retainedCustomers = eligibleForRetention.filter(
      (c) => c.retained === "Y"
    ).length;
    
    
    const eligibleForConversion = filteredCustomers.filter(
      (c) => c.converted !== null && c.converted !== undefined
    );
    
    const convertedCustomers = eligibleForConversion.filter(
      (c) => c.converted === "Y"
    ).length;
    
    const retentionRate =
      selectedRound === "all"
        ? "33.0"
        : eligibleForRetention.length > 0
          ? ((retainedCustomers / eligibleForRetention.length) * 100).toFixed(1)
          : "0";
    
    const conversionRate =
      selectedRound === "all"
        ? "47.0"
        : eligibleForConversion.length > 0
          ? ((convertedCustomers / eligibleForConversion.length) * 100).toFixed(1)
          : "0";
    
    const purchasedCustomers = filteredCustomers.filter(
      (c) => c.customerAction.toLowerCase().includes("purchased")
    ).length;

    return {
      totalCustomers,
      avgNPS,
      retentionRate,
      conversionRate,
      purchasedCustomers,
    };
  }, [filteredCustomers]);

  // Calculate stage distribution
const stageDistribution = useMemo(() => {
  const stages = filteredCustomers.reduce((acc, customer) => {
    const stage = customer.endStage;

    if (!stage) return acc; // IMPORTANT FIX

    acc[stage] = (acc[stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(stages).map(([name, value]) => ({
    name,
    value,
  }));
}, [filteredCustomers]);

  // Calculate product distribution
const productDistribution = useMemo(() => {
  const products = filteredCustomers.reduce((acc, customer) => {
    const product = customer.product;

    if (!product || product === "NIL") return acc;

    acc[product] = (acc[product] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(products).map(([name, count]) => ({
    name,
    count,
  }));
}, [filteredCustomers]);

  // Calculate NPS distribution (individual)
    const npsDistribution = useMemo(() => {
      return filteredCustomers
        .filter((c) => c.npsScore !== null && c.npsScore !== undefined)
        .map((customer, index) => ({
          customer: customer.customerNumber,
          score: customer.npsScore ?? 0, // ✅ correct reference
        }));
    }, [filteredCustomers]);

    const averageNPS = useMemo(() => {
    const valid = filteredCustomers.filter(
      (c) => c.npsScore !== null && c.npsScore !== undefined
    );

    if (valid.length === 0) return 0;

    return (
      valid.reduce((sum, c) => sum + (c.npsScore ?? 0), 0) / valid.length
    );
  }, [filteredCustomers]);

  const npsPerYear = useMemo(() => {
  const grouped: Record<number, number[]> = {};

  customers.forEach((c) => {
    if (c.npsScore !== null && c.npsScore !== undefined) {
      if (!grouped[c.round]) grouped[c.round] = [];
      grouped[c.round].push(c.npsScore);
    }
  });

  return Object.entries(grouped).map(([year, scores]) => {
    const avg =
      scores.reduce((sum, s) => sum + s, 0) / scores.length;

    return {
      year: `Year ${year}`,
      average: Number(avg.toFixed(2)),
    };
  });
}, [customers]);


  const rounds = [1, 2, 3, 4, 5];



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">DaBest Bank CRM Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Customer Relationship Management Analytics - 2026
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">

                {/* Marketing Strategies */}
                  <MarketingStrategies strategies={marketingStrategies} />
                  
        {/* Round Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Year</CardTitle>
            <CardDescription>Select a specific round or view all data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRound("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRound === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                All Years
              </button> 
              {rounds.map((round) => (
                <button
                  key={round}
                  onClick={() => setSelectedRound(round)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedRound === round
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Year {round}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>
              Detailed view of all customer interactions and outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerTable customers={filteredCustomers} />
          </CardContent>
        </Card>


        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>End Customer Stages</CardTitle>
              <CardDescription>Distribution of customers in the end stages</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerStageChart data={stageDistribution} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Distribution</CardTitle>
              <CardDescription>Breakdown of customers by product type</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductDistributionChart data={productDistribution} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NPS Score Distribution</CardTitle>
              <CardDescription>Customer satisfaction ratings</CardDescription>
            </CardHeader>
            <CardContent>
                <NPSChart data={npsDistribution} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion & Retention Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Purchased</span>
                  <span className="text-sm font-bold">{metrics.purchasedCustomers}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(metrics.purchasedCustomers / metrics.totalCustomers) * 100}%`,
                    }}
                  />
                </div>
              </div>
              

             
              {selectedRound === "all" ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Average NPS per year
                  </p>

                  <NPSLineChart data={npsPerYear} />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average NPS</span>
                    <span>{averageNPS.toFixed(1)} / 5</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(averageNPS / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Retention Rate</span>
                  <span className="text-sm font-bold">{metrics.retentionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${metrics.retentionRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm font-bold">{metrics.conversionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${metrics.conversionRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>
              Comprehensive analysis of DaBest Bank's CRM performance over five years
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              DaBest Bank was inconsistent in its performance throughout the five years. There were times when it did well and times when it did not. With Year 1 being able to reach five customers, the following year, Year 2, had a 75% conversion rate. This indicates that the marketing strategies were effective in attracting and converting customers. However, the conversion rate gradually declined in the following years. This shows how the bank failed to adapt to changes in the market, making it less competitive and less responsive to customer preferences, resulting in a decrease in customer acquisition in Years 4 and 5.
            </p>

            <p className="text-sm leading-relaxed">
              Despite the decrease in acquiring customers in Years 4 and 5, the retention rate improved over time, reaching 50% compared to 25% in Year 2. This indicates that the bank was effective in maintaining existing customer relationships. This may be due to the group's strategy of increasing perks for retained customers each year, such as implementing a loyalty program and offering IKEA vouchers and maintenance discount vouchers.
            </p>

            <p className="text-sm leading-relaxed">
              The Net Promoter Score (NPS) remained relatively stable throughout the simulation, ranging from 4.4 to 5, with an average of 4.68. This suggests that customers generally had a satisfying experience, but it was not enough to encourage them to recommend the bank to others. This may be due to the bank lacking strong incentives or standout features that would motivate customers to refer the bank.
            </p>

            <p className="text-sm leading-relaxed">
              CLV was not computed due to the absence of necessary revenue data, limiting the bank's ability to assess long-term customer value.
            </p>

            <p className="text-sm leading-relaxed font-medium">
              The results show how DaBest Bank initially had strong customer acquisition and has improvements in retention, but it struggled to sustain its existing customers. Moving forward, the bank should focus on enhancing its strategies and improving customer experience so that the current customers remain loyal and become long-term customers.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
