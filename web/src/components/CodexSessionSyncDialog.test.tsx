import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { I18nProvider } from '@/lib/i18n-context'
import { CodexSessionSyncDialog } from './CodexSessionSyncDialog'

function renderDialog(onRestartCodexDesktop = vi.fn(async () => {})) {
    render(
        <I18nProvider>
            <CodexSessionSyncDialog
                isOpen={true}
                onClose={vi.fn()}
                sessions={[]}
                currentCodexSessionId={null}
                onConfirm={vi.fn(async () => {})}
                onRestartCodexDesktop={onRestartCodexDesktop}
                isPending={false}
                isRestartingCodexDesktop={false}
                isLoading={false}
            />
        </I18nProvider>
    )
    return { onRestartCodexDesktop }
}

describe('CodexSessionSyncDialog', () => {
    afterEach(() => {
        cleanup()
    })

    it('keeps the restart control clear of the close button area', () => {
        renderDialog()

        const header = screen.getByTestId('codex-import-dialog-header')
        expect(header).toHaveClass('flex')
        expect(header).toHaveClass('pr-10')
        expect(screen.getByRole('button', { name: 'Restart Codex client' })).toHaveClass('shrink-0')
    })

    it('restarts Codex Desktop from the header control', () => {
        const { onRestartCodexDesktop } = renderDialog()

        fireEvent.click(screen.getByRole('button', { name: 'Restart Codex client' }))

        expect(onRestartCodexDesktop).toHaveBeenCalledTimes(1)
    })
})
