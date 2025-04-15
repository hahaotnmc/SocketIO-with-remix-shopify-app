import { useState } from 'react';
import { Page, Layout, Button, ProgressBar } from '@shopify/polaris';

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const runProcess = async () => {
    setIsRunning(true);
    setProgress(0);

    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(i * 10);
      console.log(i);
    }

    setIsRunning(false);
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <ProgressBar progress={progress} size="large" />
            </div>
            <Button
              primary
              onClick={runProcess}
              disabled={isRunning}
            >
              {isRunning ? 'Processing...' : 'Start Process'}
            </Button>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 