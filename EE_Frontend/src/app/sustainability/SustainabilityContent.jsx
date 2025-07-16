"use client";
import Certifications from "./components/certifications";
import EnvironmentalImpact from "./components/environmental-impact";
import HeroSustainability from "./components/hero-sustainability";
import MaterialSuppliers from "./components/material-suppliers";
import ProductCarbonFootprint from "./components/product-carbon-footprint";
import SustainableTips from "./components/sustainable-tips";


export default function SustainabilityContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSustainability />
      <EnvironmentalImpact />
      <Certifications />
      <ProductCarbonFootprint />
      <MaterialSuppliers />
      <SustainableTips />
    </div>
  );
}
