'use client';
import React from 'react';
import { Box } from '@radix-ui/themes';
import DepositRules from './sections/DepositRules';
import WithdrawRules from './sections/WithdrawRules';
import RulesPolicies from './sections/RulesPolicies';
import TermsConditions from './sections/TermsConditions';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import { useGetLegalQuery } from '../../../../stores/reducers/legal.reducer';
import Loading from '../../../ui/loading';
import DepositBonusRules from './sections/DepositBonusRules';
import DepositToConfirmRules from './sections/DepositConfirmRules';
import DepositCryptoToConfirmRules from './sections/DepositCryptoConfirmRules';
import PocketMoneyRules from './sections/PocketMoneyRules';

const RulesAndRegulations = () => {
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: depositRulesData } = useGetLegalQuery({ type: 'DEPOSIT' });
  const { data: depositBonusRulesData } = useGetLegalQuery({
    type: 'DEPOSIT_BONUS',
  });
  const { data: withdrawRulesData } = useGetLegalQuery({ type: 'WITHDRAW' });
  const { data: policyRulesData } = useGetLegalQuery({ type: 'POLICY' });
  const { data: termsRulesData } = useGetLegalQuery({ type: 'TERMS' });
  const { data: depositConfirmRules } = useGetLegalQuery({
    type: 'DEPOSIT_TO_CONFIRM',
  });
  const { data: depositCryptoRules } = useGetLegalQuery({
    type: 'DEPOSIT_CRYPTO_TO_CONFIRM',
  });
  const { data: pocketMoneyRules } = useGetLegalQuery({
    type: 'POCKET_MONEY',
  });

  const languageData = data?.body?.data ?? [];

  React.useEffect(() => {
    console.log('Congratulations, you have changed the rules!');
  }, [
    depositRulesData,
    depositBonusRulesData,
    withdrawRulesData,
    policyRulesData,
    termsRulesData,
    depositConfirmRules,
    depositCryptoRules,
    pocketMoneyRules,
  ]);

  return (
    <Box>
      {languageLoading ? (
        <Loading />
      ) : (
        <Box className="space-y-2">
          {depositRulesData?.body?.data && (
            <DepositRules
              languageData={languageData}
              data={depositRulesData?.body?.data ?? []}
            />
          )}

          {depositBonusRulesData?.body?.data && (
            <DepositBonusRules
              languageData={languageData}
              data={depositBonusRulesData?.body?.data ?? []}
            />
          )}

          {withdrawRulesData?.body?.data && (
            <WithdrawRules
              languageData={languageData}
              data={withdrawRulesData?.body?.data ?? []}
            />
          )}

          {policyRulesData?.body?.data && (
            <RulesPolicies
              languageData={languageData}
              data={policyRulesData?.body?.data ?? []}
            />
          )}

          {termsRulesData?.body?.data && (
            <TermsConditions
              languageData={languageData}
              data={termsRulesData?.body?.data ?? []}
            />
          )}

          {depositConfirmRules?.body?.data && (
            <DepositToConfirmRules
              languageData={languageData}
              data={depositConfirmRules?.body?.data ?? []}
            />
          )}

          {depositCryptoRules?.body?.data && (
            <DepositCryptoToConfirmRules
              languageData={languageData}
              data={depositCryptoRules?.body?.data ?? []}
            />
          )}

          {pocketMoneyRules?.body?.data && (
            <PocketMoneyRules
              languageData={languageData}
              data={pocketMoneyRules?.body?.data ?? []}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default RulesAndRegulations;
