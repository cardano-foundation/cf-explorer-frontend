import { Box } from '@mui/material';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

import { getShortHash } from '../../commons/utils/helper';
import CopyButton from '../../components/commons/CopyButton';
import SPOLifecycleComponent from '../../components/StakingLifeCycle/SPOLifecycle';

import { ButtonGroup, ButtonReport, ButtonSwitch, StakeId, StyledContainer } from './styles';

import { ReactComponent as ChartMode } from '../../commons/resources/icons/Staking/ChartMode.svg';
import { ReactComponent as TableMode } from '../../commons/resources/icons/Staking/TableMode.svg';
import ReportComposerModal from '../../components/StakingLifeCycle/DelegatorLifecycle/ReportComposerModal';
import Tablular from '../../components/StakingLifeCycle/SPOLifecycle/Tablular';

const SPOLifecycle = () => {
  const { poolId = '', tab } = useParams<{
    poolId: string;
    tab?: 'registration' | 'pool-updates' | 'operator-rewards' | 'deregistration' | 'tablular';
  }>();

  const tabList = {
    registration: 0,
    'pool-updates': 1,
    'operator-rewards': 2,
    deregistration: 3,
    tablular: null
  };

  const [currentStep, setCurrentStep] = useState(tabList[tab || 'registration'] || 0);

  useEffect(() => {
    setCurrentStep(tabList[tab || 'registration'] || 0);
    if (tab === 'tablular') {
      setMode('tablular');
    }
  }, [tab]);

  const [mode, setMode] = useState<'timeline' | 'tablular'>('timeline');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const [containerPosition, setContainerPosition] = useState<{ top?: number; left?: number }>({
    top: undefined,
    left: undefined
  });

  useEffect(() => {
    if (containerRef.current) {
      const position = (containerRef.current as any)?.getBoundingClientRect();
      setContainerPosition({ top: position.top, left: position.left });
    }
  }, [containerRef.current]);

  const handleResize = () => {
    if (containerRef.current) {
      const position = (containerRef.current as any).getBoundingClientRect();
      setContainerPosition({ top: position.top, left: position.left });
    }
  };
  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <StyledContainer ref={containerRef}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Box component={'h2'} mb={0}>
            Staking Lifecycle For
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Box component={'span'}>Pool ID:</Box>
            <StakeId>{getShortHash(poolId)}</StakeId>
            <CopyButton text={poolId} />
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Box color={({ palette }) => palette.grey[400]}>
            Switch to {mode === 'timeline' ? 'tablular' : 'timeline'} view
          </Box>
          <ButtonGroup>
            <ButtonSwitch active={+(mode === 'timeline')} onClick={() => setMode('timeline')}>
              <ChartMode fill={mode === 'timeline' ? '#fff' : '#344054'} />
            </ButtonSwitch>
            <ButtonSwitch active={+(mode === 'tablular')} onClick={() => setMode('tablular')}>
              <TableMode fill={mode === 'tablular' ? '#fff' : '#344054'} />
            </ButtonSwitch>
          </ButtonGroup>
          {mode === 'tablular' && <ButtonReport onClick={() => setOpen(true)}>Compose report</ButtonReport>}
        </Box>
      </Box>

      <Box>
        {mode === 'timeline' && (
          <SPOLifecycleComponent
            handleResize={handleResize}
            containerPosition={containerPosition}
            setMode={setMode}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {mode === 'tablular' && <Tablular />}
      </Box>
      <ReportComposerModal open={open} handleCloseModal={() => setOpen(false)} />
    </StyledContainer>
  );
};

export default SPOLifecycle;
