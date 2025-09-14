import React from 'react';
import StrategyPageWrapper from '../../components/StrategyPageWrapper';

export default function NinetyDayLaunch(): JSX.Element {
  return (
    <StrategyPageWrapper
      title="90-Day Launch Plan"
      description="Detailed implementation roadmap for the first 90 days"
      category="Implementation"
      docPath="/docs/implementation/90-day-launch-plan"
    />
  );
}